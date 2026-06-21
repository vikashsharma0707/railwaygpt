// // /** Tool/function-call schema exposed to the LLM (OpenAI-compatible). */
// // module.exports = [
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'search_trains',
// //       description: 'Search trains between two station codes for a journey date.',
// //       parameters: {
// //         type: 'object',
// //         properties: {
// //           from: { type: 'string', description: 'Source station code, e.g. NDLS' },
// //           to: { type: 'string', description: 'Destination station code, e.g. BCT' },
// //           date: { type: 'string', description: 'ISO date YYYY-MM-DD' },
// //           class: { type: 'string', enum: ['SL','3A','2A','1A','CC','2S'] },
// //         },
// //         required: ['from', 'to', 'date'],
// //       },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'check_pnr',
// //       description: 'Fetch booking and passenger status for a PNR number.',
// //       parameters: { type: 'object', properties: { pnr: { type: 'string' } }, required: ['pnr'] },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'create_booking_draft',
// //       description: 'Create a draft booking for the current user.',
// //       parameters: {
// //         type: 'object',
// //         properties: {
// //           trainId: { type: 'string' },
// //           journeyDate: { type: 'string' },
// //           class: { type: 'string' },
// //           fromCode: { type: 'string' },
// //           toCode: { type: 'string' },
// //           quota: { type: 'string' },
// //           passengers: {
// //             type: 'array',
// //             items: {
// //               type: 'object',
// //               properties: {
// //                 name: { type: 'string' }, age: { type: 'number' },
// //                 gender: { type: 'string', enum: ['M','F','O'] },
// //                 berthPreference: { type: 'string' },
// //               },
// //               required: ['name','age','gender'],
// //             },
// //           },
// //         },
// //         required: ['trainId','journeyDate','class','fromCode','toCode','passengers'],
// //       },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'create_payment_order',
// //       description: 'Create a Razorpay order for a draft booking.',
// //       parameters: { type: 'object', properties: { bookingId: { type: 'string' } }, required: ['bookingId'] },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'cancel_booking',
// //       description: 'Cancel a booking by id for the current user.',
// //       parameters: { type: 'object', properties: { bookingId: { type: 'string' } }, required: ['bookingId'] },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'rag_search',
// //       description: 'Search the railway knowledge base for policies, rules, FAQs and documents.',
// //       parameters: {
// //         type: 'object',
// //         properties: { query: { type: 'string' }, topK: { type: 'number', default: 5 } },
// //         required: ['query'],
// //       },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'predict_confirmation',
// //       description: 'Estimate the probability that a waitlisted ticket will be confirmed.',
// //       parameters: {
// //         type: 'object',
// //         properties: { trainNumber: { type: 'string' }, class: { type: 'string' }, waitlistPosition: { type: 'number' } },
// //         required: ['trainNumber','class','waitlistPosition'],
// //       },
// //     },
// //   },
// //   {
// //     type: 'function',
// //     function: {
// //       name: 'predict_delay',
// //       description: 'Predict expected delay (minutes) for a train.',
// //       parameters: { type: 'object', properties: { trainNumber: { type: 'string' } }, required: ['trainNumber'] },
// //     },
// //   },
// // ];


// /**
//  * Tool / function-call schema exposed to the LLM (OpenAI-compatible).
//  *
//  * KEY DESIGN PRINCIPLE:
//  *   Descriptions are written as direct instructions to the LLM so it calls
//  *   the tool immediately instead of asking the user for more details.
//  */
// module.exports = [
//   /* ─── Train Search ──────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'search_trains',
//       description: `Search trains between two stations.

// CALL THIS TOOL IMMEDIATELY — do NOT ask user for more details first.

// Rules:
// - If user says a city name, pass it as-is (Mumbai, Delhi, Pune). The system will auto-convert to station code.
// - If no date given, use today: ${new Date().toISOString().split('T')[0]}
// - If no route given (e.g. "cheapest train batao"), ask ONLY for source+destination in one short message, then call this tool.
// - For "luxury" trains: set trainType="luxury". For "express": trainType="express". Default: trainType="all".
// - For "cheapest": call with trainType="all", then sort results by lowest fare.
// - For "fastest": call with trainType="all", then sort results by lowest durationMinutes.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           from:      { type: 'string', description: 'Source station code e.g. NDLS, BCT, PUNE' },
//           to:        { type: 'string', description: 'Destination station code e.g. BCT, NDLS, MAS' },
//           date:      { type: 'string', description: 'Journey date YYYY-MM-DD. Use today if not specified.' },
//           class:     { type: 'string', enum: ['SL','3A','2A','1A','CC','2S'], description: 'Optional travel class filter' },
//           trainType: {
//             type: 'string',
//             enum: ['express', 'superfast', 'luxury', 'passenger', 'all'],
//             description: 'Filter by train type. Use "luxury" for Rajdhani/Vande Bharat/Tejas/Shatabdi. Default: "all"',
//           },
//           quota: {
//             type: 'string',
//             enum: ['GN', 'TQ', 'LD', 'SS'],
//             description: 'Booking quota. TQ = Tatkal. Default: GN',
//           },
//         },
//         required: ['from', 'to', 'date'],
//       },
//     },
//   },

//   /* ─── PNR Check ─────────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'check_pnr',
//       description: `Fetch live booking and passenger status for a PNR number.
// CALL THIS TOOL IMMEDIATELY when the user provides any 10-digit number or mentions PNR, ticket status, booking status.
// Do NOT ask for confirmation — call it right away.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           pnr: { type: 'string', description: '10-digit PNR number' },
//         },
//         required: ['pnr'],
//       },
//     },
//   },

//   /* ─── Booking Draft ──────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'create_booking_draft',
//       description: `Create a draft booking for the user after they have selected a train.
// Call this ONLY after the user explicitly confirms which train and class they want.
// Collect passenger details (name, age, gender) before calling.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           trainId:     { type: 'string', description: 'Train _id from search_trains result' },
//           journeyDate: { type: 'string', description: 'YYYY-MM-DD' },
//           class:       { type: 'string', enum: ['SL','3A','2A','1A','CC','2S'] },
//           fromCode:    { type: 'string' },
//           toCode:      { type: 'string' },
//           quota:       { type: 'string', enum: ['GN','TQ','LD','SS'], description: 'Default GN' },
//           passengers: {
//             type: 'array',
//             items: {
//               type: 'object',
//               properties: {
//                 name:            { type: 'string' },
//                 age:             { type: 'number' },
//                 gender:          { type: 'string', enum: ['M','F','O'] },
//                 berthPreference: { type: 'string', enum: ['LB','MB','UB','SL','SU'], description: 'Optional berth preference' },
//               },
//               required: ['name', 'age', 'gender'],
//             },
//           },
//         },
//         required: ['trainId', 'journeyDate', 'class', 'fromCode', 'toCode', 'passengers'],
//       },
//     },
//   },

//   /* ─── Payment Order ──────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'create_payment_order',
//       description: 'Create a Razorpay payment order for a confirmed draft booking. Call after create_booking_draft succeeds and user says "pay" or "confirm payment".',
//       parameters: {
//         type: 'object',
//         properties: {
//           bookingId: { type: 'string', description: 'bookingId from create_booking_draft result' },
//         },
//         required: ['bookingId'],
//       },
//     },
//   },

//   /* ─── Cancel Booking ─────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'cancel_booking',
//       description: `Cancel a booking by bookingId or PNR.
// CALL THIS TOOL IMMEDIATELY when the user says "cancel", "ticket cancel karo", or similar.
// Always show cancellation charges from the result before saying it is done.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           bookingId: { type: 'string', description: 'Booking _id to cancel' },
//         },
//         required: ['bookingId'],
//       },
//     },
//   },

//   /* ─── RAG / Knowledge Base Search ───────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'rag_search',
//       description: `Search the Indian Railways knowledge base for policies, rules, FAQs, concessions, and documents.
// CALL THIS TOOL IMMEDIATELY for any policy or rule question:
//   - Cancellation / refund rules
//   - Tatkal rules and charges
//   - Senior citizen / child concessions
//   - Luggage allowance
//   - Any "what is the rule for..." question
// Do NOT answer policy questions from memory — always call this tool first.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           query: { type: 'string', description: 'Natural language query about railway rules or policies' },
//           topK:  { type: 'number', description: 'Number of results to return (default 5)', default: 5 },
//         },
//         required: ['query'],
//       },
//     },
//   },

//   /* ─── Confirmation Probability ───────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'predict_confirmation',
//       description: `Predict the probability that a waitlisted (WL) ticket will get confirmed.
// CALL THIS TOOL IMMEDIATELY when the user asks about WL confirmation chances or "ticket confirm hoga kya".`,
//       parameters: {
//         type: 'object',
//         properties: {
//           trainNumber:      { type: 'string' },
//           class:            { type: 'string', enum: ['SL','3A','2A','1A','CC','2S'] },
//           waitlistPosition: { type: 'number', description: 'WL number e.g. 42 for WL/42' },
//         },
//         required: ['trainNumber', 'class', 'waitlistPosition'],
//       },
//     },
//   },

//   /* ─── Delay Prediction ───────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'predict_delay',
//       description: `Predict expected delay in minutes for a train.
// CALL THIS TOOL IMMEDIATELY when the user asks about train delay, running status, or "late hai kya".`,
//       parameters: {
//         type: 'object',
//         properties: {
//           trainNumber: { type: 'string', description: 'Train number e.g. 12951' },
//         },
//         required: ['trainNumber'],
//       },
//     },
//   },

//   /* ─── User Bookings ──────────────────────────────────────────────────────── */
//   {
//     type: 'function',
//     function: {
//       name: 'get_user_bookings',
//       description: `Fetch all bookings for the currently logged-in user.
// CALL THIS TOOL IMMEDIATELY when the user asks "meri tickets", "my bookings", "booked tickets dikhao", or similar.`,
//       parameters: {
//         type: 'object',
//         properties: {
//           status: {
//             type: 'string',
//             enum: ['all', 'confirmed', 'waitlisted', 'cancelled'],
//             description: 'Filter by booking status. Default: all',
//           },
//           limit: { type: 'number', description: 'Max results. Default 10.' },
//         },
//       },
//     },
//   },
// ];




/**
 * tools.schema.js
 * 9 real tools — exactly what tools.executor.js implements.
 * Descriptions written as DIRECT COMMANDS to the LLM so it calls tools
 * immediately instead of asking the user for more details.
 */

const TODAY = () => new Date().toISOString().split('T')[0];

module.exports = [

  /* ─── 1. SEARCH TRAINS ─────────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'search_trains',
      description: `Search trains between two stations from the database.

CALL THIS IMMEDIATELY when:
- User mentions any two cities/places
- User asks about trains, express, luxury, Rajdhani, Vande Bharat, Shatabdi, Tejas
- User says "train batao", "kaun si train hai", "kab chalti hai"
- User asks for cheapest/fastest/luxury trains on any route

RULES:
- Pass city names directly (Mumbai, Delhi, Pune) — system auto-converts to codes
- If date not given → use today: ${TODAY()}
- If class not given → omit it (search all classes)
- For luxury trains → set trainType="luxury"
- For express trains → set trainType="express"
- NEVER ask user for station codes — infer from city names`,
      parameters: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: 'Source city name or station code. e.g. "Mumbai", "Delhi", "NDLS", "BCT"',
          },
          to: {
            type: 'string',
            description: 'Destination city name or station code. e.g. "Pune", "Chennai", "PUNE", "MAS"',
          },
          date: {
            type: 'string',
            description: `Journey date in YYYY-MM-DD format. Use today (${TODAY()}) if not specified.`,
          },
          class: {
            type: 'string',
            enum: ['SL', '3A', '2A', '1A', 'CC', '2S'],
            description: 'Travel class filter. Omit to show all classes.',
          },
          trainType: {
            type: 'string',
            enum: ['all', 'express', 'superfast', 'luxury', 'passenger'],
            description: 'Train type filter. "luxury" = Rajdhani/Vande Bharat/Shatabdi/Tejas. Default: "all"',
          },
          quota: {
            type: 'string',
            enum: ['GN', 'TQ', 'LD', 'SS'],
            description: 'Booking quota. TQ = Tatkal. Default: GN',
          },
        },
        required: ['from', 'to', 'date'],
      },
    },
  },

  /* ─── 2. CHECK PNR ──────────────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'check_pnr',
      description: `Fetch live ticket/booking status from database for a PNR number.

CALL THIS IMMEDIATELY when:
- User provides any 10-digit number
- User says "PNR check karo", "ticket status", "mera ticket"
- User asks "confirm hua kya", "WL status kya hai"
- User says "cancel karna hai" (check PNR first)

NEVER ask for confirmation — call right away with the PNR number.`,
      parameters: {
        type: 'object',
        properties: {
          pnr: {
            type: 'string',
            description: '10-digit PNR number',
          },
        },
        required: ['pnr'],
      },
    },
  },

  /* ─── 3. CREATE BOOKING DRAFT ───────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'create_booking_draft',
      description: `Create a booking draft in the database after user selects a train.

CALL THIS when:
- User has confirmed which train and class they want
- You have passenger details (name, age, gender)
- Before calling create_payment_order

FLOW: search_trains → user picks train → collect passengers → create_booking_draft → create_payment_order`,
      parameters: {
        type: 'object',
        properties: {
          trainId: { type: 'string', description: 'Train _id from search_trains result' },
          journeyDate: { type: 'string', description: 'YYYY-MM-DD' },
          class: { type: 'string', enum: ['SL', '3A', '2A', '1A', 'CC', '2S'] },
          fromCode: { type: 'string', description: 'Source station code from search result' },
          toCode: { type: 'string', description: 'Destination station code from search result' },
          quota: { type: 'string', enum: ['GN', 'TQ', 'LD', 'SS'], description: 'Default: GN' },
          passengers: {
            type: 'array',
            description: 'List of passengers (min 1, max 6)',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'number' },
                gender: { type: 'string', enum: ['M', 'F', 'O'] },
                berthPreference: {
                  type: 'string',
                  enum: ['LB', 'MB', 'UB', 'SL', 'SU'],
                  description: 'Optional. LB=Lower, MB=Middle, UB=Upper, SL=Side Lower, SU=Side Upper',
                },
              },
              required: ['name', 'age', 'gender'],
            },
          },
        },
        required: ['trainId', 'journeyDate', 'class', 'fromCode', 'toCode', 'passengers'],
      },
    },
  },

  /* ─── 4. CREATE PAYMENT ORDER ───────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'create_payment_order',
      description: `Create a Razorpay payment order for a confirmed booking draft.

CALL THIS when:
- create_booking_draft succeeded and returned a bookingId
- User says "pay karo", "confirm karo", "book karo"

NEVER call before create_booking_draft succeeds.`,
      parameters: {
        type: 'object',
        properties: {
          bookingId: {
            type: 'string',
            description: 'bookingId returned from create_booking_draft',
          },
        },
        required: ['bookingId'],
      },
    },
  },

  /* ─── 5. CANCEL BOOKING ─────────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'cancel_booking',
      description: `Cancel a booking in the database.

CALL THIS when:
- User explicitly confirms they want to cancel
- You have already shown cancellation charges via check_pnr

ALWAYS call check_pnr first to show refund amount, THEN ask for confirmation, THEN call cancel_booking.`,
      parameters: {
        type: 'object',
        properties: {
          bookingId: {
            type: 'string',
            description: 'Booking _id to cancel (get from check_pnr result)',
          },
        },
        required: ['bookingId'],
      },
    },
  },

  /* ─── 6. RAG SEARCH ─────────────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'rag_search',
      description: `Search Indian Railways knowledge base for policies, rules, FAQs, and information.

CALL THIS IMMEDIATELY when:
- User asks about cancellation/refund rules or charges
- User asks about Tatkal rules, charges, timing
- User asks about concessions (senior citizen, child, disabled, student)
- User asks luggage allowance, ID proof rules
- User asks "kya rule hai", "policy kya hai", "kitna charge lagega"
- User asks about train types, classes explained
- User asks tourist places, attractions near a city
- User asks about railway facilities, food, pantry

NEVER answer policy questions from memory — always call this tool first.`,
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Natural language search query in Hindi or English',
          },
          topK: {
            type: 'number',
            description: 'Number of results (default 5, max 8)',
          },
        },
        required: ['query'],
      },
    },
  },

  /* ─── 7. PREDICT CONFIRMATION ───────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'predict_confirmation',
      description: `Predict probability that a waitlisted (WL) ticket will get confirmed.

CALL THIS IMMEDIATELY when:
- User asks "WL confirm hoga kya", "ticket confirm hogi"
- User mentions a WL number (e.g. WL/42, WL 15)
- User asks about waitlist chances

If user gives PNR → call check_pnr first to get trainNumber, class, WL position → then call this.`,
      parameters: {
        type: 'object',
        properties: {
          trainNumber: { type: 'string', description: 'Train number e.g. "12951"' },
          class: { type: 'string', enum: ['SL', '3A', '2A', '1A', 'CC', '2S'] },
          waitlistPosition: { type: 'number', description: 'WL position number e.g. 42 for WL/42' },
        },
        required: ['trainNumber', 'class', 'waitlistPosition'],
      },
    },
  },

  /* ─── 8. PREDICT DELAY ──────────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'predict_delay',
      description: `Predict expected delay for a train from the database.

CALL THIS IMMEDIATELY when:
- User asks "train late hai kya", "delay kitna hai", "time pe aayegi"
- User asks running status of a train
- User gives a train number and asks about punctuality

Requires train number — if user gives train name, ask for number then call immediately.`,
      parameters: {
        type: 'object',
        properties: {
          trainNumber: {
            type: 'string',
            description: 'Train number e.g. "12951", "22222"',
          },
        },
        required: ['trainNumber'],
      },
    },
  },

  /* ─── 9. GET USER BOOKINGS ──────────────────────────────────────────────── */
  {
    type: 'function',
    function: {
      name: 'get_user_bookings',
      description: `Fetch all bookings for the logged-in user from the database.

CALL THIS IMMEDIATELY when:
- User says "meri tickets", "my bookings", "meri booking dikhao"
- User asks "maine kya book kiya hai", "upcoming trips"
- User asks to cancel but doesn't give a PNR (fetch bookings first)
- User asks about their travel history`,
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['all', 'confirmed', 'waitlisted', 'cancelled'],
            description: 'Filter by status. Default: all',
          },
          limit: {
            type: 'number',
            description: 'Max results to return. Default: 10',
          },
        },
      },
    },
  },

];