'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';
import { useAuth } from "@clerk/nextjs";
import { toast } from 'sonner';
import { checkBookExists, createBook, saveBookSegments, uploadToBlob } from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { parsePDFFile } from "@/lib/utils";

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
    if (!userId) return toast.error("Please login to upload books");
    setIsSubmitting(true);

    try {
        // 1. Check if book exists
        const existsCheck = await checkBookExists(data.title);
        if (existsCheck.exists) {
            toast.info("Book already exists.");
            return router.push(`/books/${existsCheck.book.slug}`);
        }

        const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();

        // 2. Parse PDF for content
        const parsedPDF = await parsePDFFile(data.pdfFile);

        // 3. Upload PDF
        const pdfData = new FormData();
        pdfData.append('file', data.pdfFile);
        pdfData.append('filename', `${fileTitle}.pdf`);
        const uploadedPdf = await uploadToBlob(pdfData);

        // 4. Handle Cover (Manual or Auto)
        let coverUrl = "";
        const coverData = new FormData();
        
        if (data.coverImage) {
            coverData.append('file', data.coverImage);
        } else {
            // If no cover, we fetch the auto-generated one from your API
            const res = await fetch('/api/upload', { method: 'POST', body: pdfData });
            const blob = await res.blob();
            coverData.append('file', blob);
        }
        
        coverData.append('filename', `${fileTitle}_cover.png`);
        const uploadedCover = await uploadToBlob(coverData);
        coverUrl = uploadedCover.url;

        // 5. Create Book Entry
        const book = await createBook({
            clerkId: userId,
            title: data.title,
            author: data.author,
            persona: data.persona,
            fileURL: uploadedPdf.url,
            fileBlobKey: uploadedPdf.pathname,
            coverURL: coverUrl,
            fileSize: data.pdfFile.size,
        });

        if (book.success) {
            await saveBookSegments(book.data._id, userId, parsedPDF.content);
            toast.success("Success!");
            router.push('/');
        }
    } catch (error) {
        console.error("Upload Error:", error);
        toast.error("Upload failed. Check Vercel logs.");
    } finally {
        setIsSubmitting(false);
    }
};

    if (!isMounted) return null;

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FileUploader
                            control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting}
                        />

                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Rich Dad Poor Dad"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Author Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Robert Kiyosaki"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="persona"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                    <FormControl>
                                        <VoiceSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="form-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "Begin Synthesis"}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;