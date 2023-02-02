import { createEvent, createStore, sample } from 'effector';

type UploaderScreen = 'choosing' | 'file' | 'url' | 'list';
type File = { type: 'link' | 'file'; id: number; name: string; url?: string };

const changeScreen = createEvent<UploaderScreen>();
const $uploaderScreen = createStore<UploaderScreen>('choosing');

sample({
    clock: changeScreen,
    target: $uploaderScreen,
});

// files logic

const uploadFile = createEvent<File>();
const deleteFile = createEvent<File['id']>();

const $uploadedFiles = createStore<File[]>([]);

sample({
    source: $uploadedFiles,
    clock: uploadFile,
    fn: (files, newFile) => [...files, newFile],
    target: $uploadedFiles,
});

sample({
    source: $uploadedFiles,
    clock: deleteFile,
    fn: (files, fileId) => files.filter(({ id }) => id !== fileId),
    target: $uploadedFiles,
});

export const events = {
    changeScreen,
    uploadFile,
    deleteFile,
};

export const stores = {
    $uploadedFiles,
    $uploaderScreen,
};
