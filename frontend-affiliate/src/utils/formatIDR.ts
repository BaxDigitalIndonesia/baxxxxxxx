export const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: "compact",
      minimumFractionDigits: 2,
    }).format(number);
  };