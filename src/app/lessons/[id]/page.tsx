"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useLessonQuery } from "@/api/queries/lessons"
import { useCompleteLessonMutation } from "@/api/mutations/lessons"
import {
    ArrowLeft,
    PlayCircle,
    FileText,
    Download,
    Clock,
    BookOpen,
    ExternalLink,
    HelpCircle,
    CheckCircle
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import QuizComponent from "@/components/quiz/QuizComponent"
import { toast } from "sonner"
import { AxiosError } from "axios"

// YouTube URL ni embed formatga o'girish
const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
        /(?:youtu\.be\/)([^&\n?#]+)/,
        /(?:youtube\.com\/embed\/)([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return `https://www.youtube.com/embed/${match[1]}?rel=0`;
        }
    }
    return null;
};

// File formatni aniqlash
const getFileType = (fileName: string) => {
    if (!fileName) return 'File';

    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: { [key: string]: string } = {
        pdf: 'PDF Document',
        doc: 'Word Document',
        docx: 'Word Document',
        ppt: 'PowerPoint Presentation',
        pptx: 'PowerPoint Presentation',
        xls: 'Excel Spreadsheet',
        xlsx: 'Excel Spreadsheet',
        txt: 'Text Document',
        zip: 'ZIP Archive',
        rar: 'RAR Archive'
    };

    return typeMap[extension || ''] || 'File';
};

// File icon aniqlash
const getFileIcon = (fileName: string) => {
    if (!fileName) return <FileText className="h-8 w-8 text-gray-400" />;

    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'pdf':
            return <div className="h-8 w-8 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>;
        case 'doc':
        case 'docx':
            return <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">DOC</div>;
        case 'ppt':
        case 'pptx':
            return <div className="h-8 w-8 bg-orange-100 rounded flex items-center justify-center text-orange-600 text-xs font-bold">PPT</div>;
        case 'xls':
        case 'xlsx':
            return <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">XLS</div>;
        default:
            return <FileText className="h-8 w-8 text-gray-400" />;
    }
};

export default function LessonDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const lessonId = params.id as string;
    const courseId = searchParams.get('courseId');

    const { data: lesson, isLoading, error } = useLessonQuery(lessonId);
    const completeLessonMutation = useCompleteLessonMutation();
    const [isClient, setIsClient] = useState(false);

    // Client-side hydration uchun
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Complete lesson funksiyasi - ORQAGA QAYTISH bilan
    const handleCompleteLesson = async () => {
        try {
            await completeLessonMutation.mutateAsync(lessonId);

            // Muvaffaqiyatli complete bo'lgandan so'ng, orqaga qaytish
            if (courseId) {
                // Agar courseId bo'lsa, kurs sahifasiga qaytish
                router.push(`/courses/${courseId}`);
            } else {
                // Aks holda, kurslar ro'yxatiga qaytish
                router.push('/courses');
            }

        } catch {
            // Xatolik allaqachon toast orqali ko'rsatiladi
        }

    };

    const axiosError = error as AxiosError;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading lesson...</p>
                    <p className="text-xs text-gray-400 mt-2">ID: {lessonId}</p>
                </div>
            </div>
        );
    }

    if (axiosError) {
        console.error("Lesson API Error:", axiosError);

        if (axiosError.response?.status === 403) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Required</h1>
                        <p className="text-gray-600 mb-6">
                            You need to upgrade your plan to access this lesson content.
                        </p>
                        <div className="space-y-3">
                            <Link href="/upgrade">
                                <Button className="w-full">Upgrade Plan</Button>
                            </Link>
                            {courseId ? (
                                <Link href={`/courses/${courseId}`}>
                                    <Button variant="outline" className="w-full">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Course
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/courses">
                                    <Button variant="outline" className="w-full">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Courses
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (axiosError.response?.status === 404) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
                        <p className="text-gray-600 mb-4">
                            The lesson you are looking for does not exist or has been removed.
                        </p>
                        <p className="text-xs text-gray-400 mb-6">
                            Lesson ID: {lessonId}
                        </p>
                        {courseId ? (
                            <Link href={`/courses/${courseId}`}>
                                <Button>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Course
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/courses">
                                <Button>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Courses
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Lesson</h1>
                    <p className="text-gray-600 mb-4">
                        Something went wrong while loading the lesson.
                    </p>
                    <p className="text-xs text-gray-400 mb-6">
                        Status: {axiosError.response?.status || 'Unknown'}
                    </p>
                    <div className="space-y-2">
                        <Button onClick={() => router.refresh()} className="w-full">
                            Try Again
                        </Button>
                        {courseId ? (
                            <Link href={`/courses/${courseId}`}>
                                <Button variant="outline" className="w-full">
                                    Back to Course
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/courses">
                                <Button variant="outline" className="w-full">
                                    Back to Courses
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-500">No lesson data received</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        const lessonType = lesson.type.toLowerCase();

        switch (lessonType) {
            case 'video':
                if (lesson.videoUrl) {
                    const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

                    if (embedUrl) {
                        return (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="aspect-video bg-black">
                                    {isClient && (
                                        <iframe
                                            src={embedUrl}
                                            title={lesson.title}
                                            className="w-full h-full"
                                            allowFullScreen
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">Video Content</p>
                                        <a
                                            href={lesson.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center"
                                        >
                                            Watch on YouTube
                                            <ExternalLink className="h-3 w-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }

                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Video content not available</p>
                                {lesson.videoUrl && (
                                    <a
                                        href={lesson.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                                    >
                                        Try opening the video directly
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'text':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-4">
                            <FileText className="h-6 w-6 text-blue-600 inline mr-2" />
                            <span className="text-lg font-medium text-gray-900">Text Content</span>
                        </div>
                        <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600">
                            {lesson.textContent ? (
                                <div dangerouslySetInnerHTML={{ __html: lesson.textContent }} />
                            ) : (
                                <p className="text-gray-500">No text content available</p>
                            )}
                        </div>
                    </div>
                );

            case 'file':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-center py-12">
                            <div className="mb-4 flex justify-center">
                                {getFileIcon(lesson.fileName || '')}
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {lesson.fileName || 'Download File'}
                            </h3>

                            <p className="text-gray-500 mb-6">
                                {lesson.fileName ? getFileType(lesson.fileName) : 'File available for download'}
                            </p>

                            {lesson.fileUrl ? (
                                <div className="space-y-3">
                                    <a
                                        href={lesson.fileUrl}
                                        download
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download File
                                    </a>

                                    <p className="text-xs text-gray-400">
                                        Click to download the file to your device
                                    </p>
                                </div>
                            ) : (
                                <p className="text-red-500">Download link not available</p>
                            )}
                        </div>
                    </div>
                );

            case 'quiz':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-4">
                            <HelpCircle className="h-6 w-6 text-blue-600 inline mr-2" />
                            <span className="text-lg font-medium text-gray-900">Quiz</span>
                        </div>

                        {lesson.questions && lesson.questions.length > 0 ? (
                            <QuizComponent
                                questions={lesson.questions}
                                lessonId={lesson._id}
                                onQuizComplete={() => {
                                    toast.success("Quiz completed successfully!")
                                    // Quiz tugaganda orqaga qaytish
                                    if (courseId) {
                                        router.push(`/courses/${courseId}`);
                                    } else {
                                        router.push('/courses');
                                    }
                                }}
                            />
                        ) : (
                            <div className="text-center py-12">
                                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Available</h3>
                                <p className="text-gray-500">This quiz does not have any questions yet.</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-center py-12">
                            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">Content type &quot;{lesson.type}&quot; not supported</p>
                            <p className="text-xs text-gray-400">Please contact support if this is unexpected</p>
                        </div>
                    </div>
                );
        }
    };

    // Back link uchun to'g'ri URL
    const backUrl = courseId ? `/courses/${courseId}` : '/courses';
    const backText = courseId ? 'Back to Course' : 'Back to Courses';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={backUrl}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {backText}
                    </Link>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-grow">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    {lesson.type.toLowerCase() === 'video' && <PlayCircle className="h-6 w-6 text-blue-600" />}
                                    {lesson.type.toLowerCase() === 'text' && <FileText className="h-6 w-6 text-blue-600" />}
                                    {lesson.type.toLowerCase() === 'file' && <Download className="h-6 w-6 text-blue-600" />}
                                    {lesson.type.toLowerCase() === 'quiz' && <HelpCircle className="h-6 w-6 text-blue-600" />}
                                </div>

                                <div className="flex-grow">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {lesson.title}
                                    </h1>

                                    {lesson.description && (
                                        <p className="text-gray-600 mb-4">
                                            {lesson.description}
                                        </p>
                                    )}

                                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            {lesson.type}
                                        </span>

                                        <span className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {new Date(lesson.createdAt).toLocaleDateString()}
                                        </span>

                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            Order: {lesson.order}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Complete Lesson Button */}
                            <div className="flex-shrink-0">
                                <Button
                                    onClick={handleCompleteLesson}
                                    disabled={completeLessonMutation.isPending}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                >
                                    {completeLessonMutation.isPending ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : (
                                        <CheckCircle className="h-4 w-4" />
                                    )}
                                    {completeLessonMutation.isPending ? "Completing..." : "Complete Lesson"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {renderContent()}
            </div>
        </div>
    );
}