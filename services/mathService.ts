
import * as math from 'mathjs';

/**
 * High-precision math service to handle expressions safely.
 */
export const mathService = {
  /**
   * Evaluates a mathematical expression string.
   * Returns the result as a formatted string.
   */
  evaluate: (expression: string): string => {
    if (!expression || expression.trim() === '') return '';

    try {
      // Clean up expression for math.js (e.g. handle 'x' as '*')
      const cleaned = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi');

      const result = math.evaluate(cleaned);

      if (result === undefined || result === null) return '';
      
      // Handle complex numbers or matrices if they ever appear
      if (typeof result === 'object' && 'value' in result) {
        return String(result.value);
      }

      // Format result: limit decimal places to avoid scientific notation for simple values
      // and ensure 0.1 + 0.2 = 0.3
      const formatted = math.format(result, { precision: 14 });
      
      // Clean up trailing zeros and extra dots
      return formatted.replace(/(\.\d*?[1-9])0+$|\.0*$/, '$1');
    } catch (error) {
      // We don't throw here to allow real-time partial expression handling
      return 'Error';
    }
  },

  /**
   * Formats numbers for better readability
   */
  formatDisplay: (value: string): string => {
    if (!value || isNaN(Number(value))) return value;
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
};
