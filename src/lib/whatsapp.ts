export const WHATSAPP_NUMBER = '916290969079';

export function openEnquireWhatsApp(number: string, badgeOrTitle?: string, price?: number) {
  const priceStr = price ? ` - ₹${Number(price).toLocaleString('en-IN')}` : '';
  const text = encodeURIComponent(
    `Hello VIP Numbers, I want to enquire about VIP Mobile Number: ${number} (${badgeOrTitle || 'VIP'}${priceStr}). Please share the booking details.`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

export function openBuyNowWhatsApp(number: string, badgeOrTitle?: string, price?: number) {
  const priceStr = price ? ` for ₹${Number(price).toLocaleString('en-IN')}` : '';
  const text = encodeURIComponent(
    `Hello VIP Concierge, I want to Buy Now VIP Mobile Number: ${number} (${badgeOrTitle || 'VIP'}${priceStr}). Please share the booking and instant porting details.`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

export function openEscrowBuyWhatsApp(title: string, number: string, carrier: string, price: number) {
  const text = encodeURIComponent(
    `Hello VIP Concierge, I wish to complete escrow purchase for ${title} (${number}) on ${carrier} at ₹${Number(price).toLocaleString('en-IN')}.`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

export function openConciergeWhatsApp() {
  const text = encodeURIComponent(
    'Hello Luxury VIP Concierge, I would like to inquire about reserving an exclusive VIP mobile number.'
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}
