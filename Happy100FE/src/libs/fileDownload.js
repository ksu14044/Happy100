export const saveBlobFile = ({ blob, fileName }) => {
    if (!(blob instanceof Blob)) throw new Error("Blob 데이터가 필요합니다.");

    const downloadName = fileName && typeof fileName === "string" && fileName.trim() !== ""
        ? fileName
        : "attachment";

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = downloadName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};
