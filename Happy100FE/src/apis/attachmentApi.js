import { api } from '../configs/axiosConfig';

const extractFileName = (disposition) => {
    if (!disposition) return '';
    const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
        const raw = utf8Match[1].replace(/"/g, '');
        try {
            return decodeURIComponent(raw);
        } catch {
            return raw;
        }
    }
    const asciiMatch = disposition.match(/filename="?([^";]+)"?/i);
    if (asciiMatch?.[1]) return asciiMatch[1].trim();
    return '';
};

export const downloadAttachmentApi = async ({ postId, attachmentId }) => {
    if (!postId) throw new Error('postId는 필수입니다.');
    if (!attachmentId) throw new Error('attachmentId는 필수입니다.');

    const response = await api.get(
        `/api/boards/${postId}/attachments/${attachmentId}/download`,
        { responseType: 'blob' },
    );

    const disposition = response.headers?.['content-disposition'];
    const inferredName = extractFileName(disposition);

    return {
        blob: response.data,
        fileName: inferredName,
        mimeType: response.data?.type ?? '',
    };
};
