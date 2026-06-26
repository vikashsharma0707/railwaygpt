const Train = require('../models/train.model');

exports.getSeatAvailability = async (trainId, days = 30) => {
  const train = await Train.findById(trainId);
  if (!train) throw new Error("Train not found");

  const availability = [];
  const startDate = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayName = date.toLocaleString('en-US', { weekday: 'short' });

    // Check if train runs on this day
    if (!train.runningDays.includes(dayName)) {
      availability.push({ date: date.toISOString().split('T')[0], status: 'not-running' });
      continue;
    }

    const dayData = {
      date: date.toISOString().split('T')[0],
      classes: train.inventory.map(inv => {
        let status = 'medium';
        let color = 'yellow';

        if (inv.availableSeats > 50) {
          status = 'high';
          color = 'green';
        } else if (inv.availableSeats < 10) {
          status = 'low';
          color = 'red';
        }

        return {
          class: inv.class,
          available: inv.availableSeats,
          total: inv.totalSeats,
          fare: inv.fare,
          status,
          color
        };
      })
    };

    availability.push(dayData);
  }

  return availability;
};