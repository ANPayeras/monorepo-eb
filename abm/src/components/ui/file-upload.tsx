import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 10,
    y: -10,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const toolsImage = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    right: 5,
  },
};

export const FileUpload = ({
  onChange,
  containerClassName,
  dropzoneOptions,
  title = 'Subir Archivos',
  subTitle = 'Arrastra o presiona para agregar archivos',
  description,
}: {
  onChange?: (files: File[]) => void;
  containerClassName?: string;
  dropzoneOptions?: DropzoneOptions;
  title?: string;
  subTitle?: string;
  description?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast()

  const handleFileChange = (newFiles: File[]) => {
    if (files.length === dropzoneOptions?.maxFiles) return
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, pos: number) => {
    e.stopPropagation()
    const filteredFiles = files.filter((_f, i) => i !== pos)
    setFiles(filteredFiles);
    onChange && onChange(filteredFiles);
  }

  // const handleClick = () => {
  //   fileInputRef.current?.click();
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    // noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (_error) => {
      toast({
        title: "Error al subir",
        description: "Tamaño o formato inválido",
        variant: 'destructive',
        duration: 5000,
      })
    },
    ...dropzoneOptions,
    maxSize: 25000000,
  });

  return (
    <div className={`${cn('w-full', containerClassName)}`} {...getRootProps()}>
      <motion.div
        // onClick={handleClick}
        whileHover="animate"
        className={cn("px-5 md:px-10 py-10 group/file block rounded-lg  w-full relative overflow-hidden", !dropzoneOptions?.disabled ? 'cursor-pointer' : 'cursor-default')}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          {...getInputProps()}
        />
        <div className="absolute inset-0 bg-opacity-35">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 text-base">
            {title}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-700 text-base mt-2 text-center">
            {subTitle}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-600 text-sm mt-2 text-center">
            {description}
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  whileHover="animate"
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex justify-between items-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm",
                  )}
                >
                  <div
                    className="flex flex-col w-[95%] overflow-hidden">
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg py-1 w-fit shrink-0 text-sm text-neutral-600 truncate dark:bg-neutral-800 dark:text-white shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                      >
                        {file.type}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modificado{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    variants={toolsImage}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="opacity-1 -mr-2 md:mr-0 md:opacity-0 py-1"
                  // className="absolute right-[5px] top-[20px] opacity-1 md:opacity-0"
                  >
                    <button onClick={(e) => onDelete(e, idx)}>
                      <IconTrash className="text-red-500 size-4 md:size-5" />
                    </button>
                  </motion.div>
                </motion.div>
              ))}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Sueltalo aqui
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-slate-500 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${index % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,.5)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}
