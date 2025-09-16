import QRCode from 'qrcode'; // Assuming a library like 'qrcode' is used

/**
 * Generates a QR code as a base64 encoded data URL for a given poll ID.
 *
 * @param pollId The unique identifier of the poll.
 * @param baseUrl The base URL of your application (e.g., 'https://your-app.com').
 *                This can be retrieved from environment variables.
 * @param options Optional configuration for QR code generation.
 * @param options.size The desired size of the QR code in pixels (width and height).
 * @param options.errorCorrection The error correction level ('L', 'M', 'Q', 'H'). Higher levels provide more resilience but larger QR codes.
 * @param options.outputFormat The desired output format ('png' for data URL, 'svg' for SVG string). Defaults to 'png'.
 * @returns A Promise that resolves to a base64 encoded data URL string of the QR code image (e.g., 'data:image/png;base64,...')
 *          if outputFormat is 'png', or an SVG string if outputFormat is 'svg'.
 */
export async function generatePollQRCode(
  pollId: string,
  baseUrl: string,
  options?: {
    size?: number;
    errorCorrection?: 'L' | 'M' | 'Q' | 'H';
    outputFormat?: 'png' | 'svg';
  }
): Promise<string> {
  const pollUrl = `${baseUrl}/polls/${pollId}`;

  const format = options?.outputFormat || 'png';

  const qrCodeOptions: QRCode.QRCodeOptions = {
    errorCorrectionLevel: options?.errorCorrection || 'M',
    width: options?.size || 256,
    margin: 2,
  };

  try {
    if (format === 'svg') {
      const svgString = await QRCode.toString(pollUrl, { ...qrCodeOptions, type: 'svg' });
      return svgString;
    } else { // Default to png
      const dataUrl = await QRCode.toDataURL(pollUrl, { ...qrCodeOptions, type: 'image/png' });
      return dataUrl;
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code.');
  }
}