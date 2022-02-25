export function downloadBuffer(blobParts: BlobPart[], fileName: string = 'file'): Promise<any> {
    return new Promise<any>((rsolve) => {
        let blob = new Blob(blobParts);
        const a = document.createElement('a');
        a.setAttribute('style', 'display: none;');
        a.setAttribute(
            'download',
            fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`
        );
        const url = URL.createObjectURL(blob);
        a.setAttribute('href', url);
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.remove();
            rsolve(undefined);
        }, 0);
    })
}
