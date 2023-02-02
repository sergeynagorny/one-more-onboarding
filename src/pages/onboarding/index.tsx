import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useStore } from 'effector-react';
import { FormikProvider, useFormik } from 'formik';
import { FC, HTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { documentUploaderModel } from 'entities/document-uploader';

import { Button, Icon, InputField } from 'shared/ui';

const UploaderButton: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...rest }) => {
    return (
        <button
            className={twMerge(
                'bg-[#232F48] text-gray-300 hover:opacity-80 active:opacity-70 font-medium p-10 rounded-md',
                className
            )}
            {...rest}
        />
    );
};

const FileList = () => {
    const files = useStore(documentUploaderModel.stores.$uploadedFiles);

    return (
        <div className="flex flex-grow flex-col gap-5">
            <div className="flex justify-between items-center">
                <h3 className="font-alt font-bold text-gray-300 text-base md:text-2xl">My Documents</h3>
                <Button
                    Prefix={PlusIcon}
                    size="sm"
                    color={files.length === 0 ? 'blue' : 'black'}
                    onClick={() => documentUploaderModel.events.changeScreen('choosing')}
                >
                    New File
                </Button>
            </div>
            <ul className="flex flex-col gap-3">
                {files.map(({ id, name, type }) => (
                    <li className="bg-[#232F48] p-4 rounded-md flex items-center gap-5" key={id}>
                        <Icon className="w-10 h-10" type={type} />
                        <h5>{name}</h5>
                        <Button
                            className="ml-auto"
                            size="sm"
                            Prefix={TrashIcon}
                            onClick={() => documentUploaderModel.events.deleteFile(id)}
                        />
                    </li>
                ))}
            </ul>

            <Button size="lg" className="w-full mt-auto" disabled={files.length === 0} color="blue">
                Submit
            </Button>
        </div>
    );
};

const FileUploader = () => {
    return <div>File Uploader</div>;
};

const UrlUploader = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            url: '',
        },
        onSubmit: (values) => {
            documentUploaderModel.events.uploadFile({ id: Date.now(), type: 'link', ...values });
            documentUploaderModel.events.changeScreen('list');
        },
    });

    return (
        <div className="xl:m-auto xl:w-80 flex flex-col gap-5">
            <h3 className="font-alt font-bold text-gray-300 text-base md:text-2xl xl:text-center">Upload From Url</h3>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <InputField name="name" label="Name" placeholder="Enter your filename" required type="text" />
                    <InputField name="url" label="File URL" placeholder="https://example.com" required type="url" />
                    <Button disabled={false} color="blue">
                        Submit
                    </Button>
                </form>
            </FormikProvider>
        </div>
    );
};

const Choosing: FC<HTMLAttributes<HTMLElement>> = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleUploadFromFileClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleUploadFromUrlClick = () => {
        documentUploaderModel.events.changeScreen('url');
    };

    const handleInputChange = () => {
        if (!inputFileRef.current) return;
        const [file] = inputFileRef.current.files || [];
        if (!file) return;
        documentUploaderModel.events.uploadFile({ id: Date.now(), type: 'file', name: file.name });
        documentUploaderModel.events.changeScreen('list');
    };

    return (
        <>
            <h3 className="font-alt font-bold text-gray-300 text-base md:text-2xl">Document Uploader</h3>
            <div className="flex flex-col md:flex-row md:flex-grow gap-5">
                <UploaderButton
                    onClick={handleUploadFromFileClick}
                    className="flex-grow flex items-center md:flex-col md:justify-center gap-5"
                >
                    <Icon className="w-12 h-12" type="file" />
                    Upload from File
                </UploaderButton>
                <UploaderButton
                    onClick={handleUploadFromUrlClick}
                    className="flex-grow flex items-center md:flex-col md:justify-center gap-5"
                >
                    <Icon className="w-12 h-12" type="link" />
                    Upload from URL
                </UploaderButton>
            </div>
            <input ref={inputFileRef} onChange={handleInputChange} type="file" style={{ display: 'none' }} />
        </>
    );
};

const DocumentUploader: FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
    const screen = useStore(documentUploaderModel.stores.$uploaderScreen);

    return (
        <div className={twMerge('bg-[#192337] rounded-xl p-4 md:p-8 flex flex-col gap-5', className)}>
            {screen === 'choosing' && <Choosing />}
            {screen === 'file' && <FileUploader />}
            {screen === 'url' && <UrlUploader />}
            {screen === 'list' && <FileList />}
        </div>
    );
};

export const Onboarding = () => {
    return (
        <section className="flex-grow flex flex-col xl:flex-row gap-8 px-4 py-6 md:p-8">
            <section className="xl:px-20 md:flex flex-col justify-center xl:w-[40%] xl:order-1">
                <h2 className="text-2xl md:text-3xl mb-2 md:mb-4 font-alt font-bold text-gradient">
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                </h2>
                <p className="text-sm md:text-base">
                    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney.
                </p>
            </section>
            <section className="flex-grow flex flex-col">
                <DocumentUploader className="flex-grow" />
            </section>
        </section>
    );
};
