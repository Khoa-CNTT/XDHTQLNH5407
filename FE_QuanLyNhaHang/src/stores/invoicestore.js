// stores/invoicesStore.js
import { defineStore } from 'pinia';

export const useInvoicesStore = defineStore('invoices', {
  state: () => ({
    invoices: [] // Danh sách các hóa đơn
  }),
  actions: {
    addInvoice(invoice) {
      this.invoices.push(invoice);
    },
    deleteInvoice(id) {
      this.invoices = this.invoices.filter(inv => inv.id !== id);
    },
    updateInvoice(updated) {
      const index = this.invoices.findIndex(inv => inv.id === updated.id);
      if (index !== -1) this.invoices[index] = { ...updated };
    }
  }
});
