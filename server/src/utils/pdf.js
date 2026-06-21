const PDFDocument = require('pdfkit');

exports.buildTicketPDF = (booking, qrDataUrl) => new Promise((resolve, reject) => {
  try {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(22).fillColor('#0f172a').text('RailwayGPT AI — E-Ticket', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#475569').text(`PNR: ${booking.pnr}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).fillColor('#0f172a');
    doc.text(`Train: ${booking.trainNumber} - ${booking.trainName}`);
    doc.text(`From: ${booking.fromStation} (${booking.fromCode})`);
    doc.text(`To:   ${booking.toStation} (${booking.toCode})`);
    doc.text(`Date: ${new Date(booking.journeyDate).toDateString()}`);
    doc.text(`Class: ${booking.class}   Quota: ${booking.quota}`);
    doc.text(`Amount: ₹${booking.totalAmount}`);
    doc.moveDown();

    doc.fontSize(13).fillColor('#0f172a').text('Passengers');
    doc.fontSize(11).fillColor('#334155');
    booking.passengers.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.name} | ${p.age}/${p.gender} | ${p.coach || '-'} ${p.seatNumber || '-'} | ${p.status}`);
    });

    if (qrDataUrl) {
      const b64 = qrDataUrl.split(',')[1];
      const img = Buffer.from(b64, 'base64');
      doc.image(img, doc.page.width - 160, 40, { width: 110 });
    }

    doc.moveDown(2);
    doc.fontSize(9).fillColor('#94a3b8').text(
      'This is a system-generated e-ticket. Carry a valid photo ID during travel.',
      { align: 'center' }
    );

    doc.end();
  } catch (e) { reject(e); }
});
