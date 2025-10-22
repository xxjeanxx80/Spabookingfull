import { format, parseISO } from 'date-fns';

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const formatDateTime = (iso: string) => {
  try {
    return format(parseISO(iso), 'MMM dd, yyyy · h:mm a');
  } catch (error) {
    return iso;
  }
};
