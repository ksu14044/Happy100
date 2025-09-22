import { useMutation } from "@tanstack/react-query";
import { downloadAttachmentApi } from "../apis/attachmentApi";
import { saveBlobFile } from "../libs/fileDownload";

export const useDownloadAttachmentMutation = () =>
    useMutation({
        mutationKey: ["downloadAttachment"],
        mutationFn: async ({ postId, attachmentId, fileName }) => {
            const result = await downloadAttachmentApi({ postId, attachmentId });
            const finalName = fileName || result.fileName || `attachment-${attachmentId}`;
            saveBlobFile({ blob: result.blob, fileName: finalName });
            return { ...result, savedFileName: finalName };
        },
        retry: 0,
        onError: (err) => {
            console.error("첨부파일 다운로드 중 오류가 발생했습니다.", err);
        },
    });
