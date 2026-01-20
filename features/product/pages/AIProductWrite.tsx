import React, { useState } from 'react';
import { ArrowLeft, Camera, Sparkles, RefreshCw, X, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input, TextArea } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import {
    AI_WRITE_GENERATION_DELAY_MS,
    AI_WRITE_MOCK_IMAGE_URL,
    AI_WRITE_MOCK_RESULT,
    PRODUCT_IMAGE_UPLOAD_LIMIT,
    PRODUCT_WRITE_MAX_IMAGES_MESSAGE
} from '../constants';
import { ROUTES } from '@/shared/constants/routes';

type WritingStep = 'FORM' | 'ANALYSIS' | 'RESULT';

export const AIProductWrite: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<WritingStep>('FORM');

    // Data States
    const [images, setImages] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [extraDesc, setExtraDesc] = useState('');
    const [personality, setPersonality] = useState('FRIENDLY');
    const [tone, setTone] = useState('POLITE');
    const [generatedResult, setGeneratedResult] = useState('');

    // Navigation Handlers
    const goBack = () => {
        if (currentStep === 'FORM') navigate(-1);
        else if (currentStep === 'RESULT') setCurrentStep('FORM');
    };

    const handleImageUpload = () => {
        if (images.length >= PRODUCT_IMAGE_UPLOAD_LIMIT) {
            alert(PRODUCT_WRITE_MAX_IMAGES_MESSAGE);
            return;
        }
        setImages([...images, AI_WRITE_MOCK_IMAGE_URL]);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleGenerate = () => {
        setCurrentStep('ANALYSIS');
        // Simulate AI delay
        setTimeout(() => {
            setGeneratedResult(AI_WRITE_MOCK_RESULT);
            setCurrentStep('RESULT');
        }, AI_WRITE_GENERATION_DELAY_MS);
    };

    const handleComplete = () => {
        navigate(ROUTES.ROOT);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-safe max-w-[430px] mx-auto relative shadow-2xl animate-[fadeIn_0.3s_ease-out] flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={goBack} className="text-ink p-1">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-black text-ink flex items-center gap-2">
                        <Sparkles size={18} className="text-cherry" />
                        AI 글 작성
                    </h1>
                </div>
                <div className="text-xs font-bold text-gray-400">
                    {currentStep === 'FORM' && '1/2'}
                    {(currentStep === 'ANALYSIS' || currentStep === 'RESULT') && '2/2'}
                </div>
            </header>

            <main className="flex-1 flex flex-col px-5 py-6 gap-6 overflow-y-auto">
                {currentStep === 'FORM' && (
                    <StepForm
                        images={images}
                        onUpload={handleImageUpload}
                        description={description}
                        onDescChange={setDescription}
                        extraDesc={extraDesc}
                        onExtraDescChange={setExtraDesc}
                        onRemove={handleRemoveImage}
                        personality={personality}
                        setPersonality={setPersonality}
                        tone={tone}
                        setTone={setTone}
                    />
                )}

                {currentStep === 'ANALYSIS' && (
                    <StepAnalysis />
                )}

                {currentStep === 'RESULT' && (
                    <StepResult
                        result={generatedResult}
                        setResult={setGeneratedResult}
                        onRegenerate={handleGenerate}
                    />
                )}
            </main>

            {/* Bottom Button Area */}
            {currentStep !== 'ANALYSIS' && (
                <div className="p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] bg-white border-t border-gray-100 sticky bottom-0 shrink-0">
                    {currentStep === 'RESULT' ? (
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={goBack}
                                className="flex-1"
                            >
                                다시 설정
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleComplete}
                                className="flex-[2] flex gap-2"
                            >
                                <Check size={20} />
                                사용하기
                            </Button>
                        </div>
                    ) : (
                        <Button
                            fullWidth
                            variant="primary"
                            onClick={handleGenerate}
                            disabled={images.length === 0 && description.trim().length === 0} // Relaxed: require either image OR desc
                            size="lg"
                            className="text-lg flex gap-2"
                        >
                            <Sparkles strokeWidth={2.5} size={20} />
                            AI로 글 생성하기
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Sub-components for Steps ---

const StepForm = ({
    images, onUpload, description, onDescChange, extraDesc, onExtraDescChange, onRemove,
    personality, setPersonality, tone, setTone
}: any) => (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        {/* Image Upload Section */}
        <section className="bg-white p-5 rounded-[20px] shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-3">상품 사진 (선택)</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                <button
                    onClick={onUpload}
                    className="flex-shrink-0 w-20 h-20 rounded-xl border border-dashed border-cherry/30 bg-cherry/5 flex flex-col items-center justify-center text-cherry gap-1 active:bg-cherry/10"
                >
                    <Camera size={24} />
                    <span className="text-xs font-bold">{images.length}/10</span>
                </button>
                {images.map((img: string, idx: number) => (
                    <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-100 relative">
                        <img src={img} alt="upload" className="w-full h-full object-cover" />
                        <button
                            onClick={() => onRemove(idx)}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* Description Section */}
        <section className="bg-white p-5 rounded-[20px] shadow-sm flex flex-col gap-4">
            <Input
                label="상품명 / 특징"
                value={description}
                onChange={(e) => onDescChange(e.target.value)}
                placeholder="예: 아이브 장원영 포카, 미개봉 앨범"
            />
            <TextArea
                label="추가 요구사항 (선택)"
                value={extraDesc}
                onChange={(e) => onExtraDescChange(e.target.value)}
                placeholder="강조하고 싶은 내용을 적어주세요"
                className="h-24"
            />
        </section>

        {/* Tone & Personality Section - Combined and Simplified */}
        <section className="bg-white p-5 rounded-[20px] shadow-sm space-y-6">
            <div>
                <p className="text-sm font-bold text-gray-400 mb-3">AI 성격</p>
                <div className="flex gap-3">
                    {['친근함', '귀여움', '깔끔함'].map(item => (
                        <button
                            key={item}
                            onClick={() => setPersonality(item)}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${personality === item ? 'bg-cherry text-white border-cherry shadow-md shadow-cherry/20' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-400 mb-3">말투</p>
                <div className="grid grid-cols-1 gap-2">
                    {[
                        { id: 'SHORT', label: '음슴체 (상태 좋음)' },
                        { id: 'POLITE', label: '존댓말 (상태 좋아요)' },
                        { id: 'SOFT', label: '부드럽게 (상태 좋아용)' }
                    ].map((opt) => (
                        <div
                            key={opt.id}
                            onClick={() => setTone(opt.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all active:scale-[0.99] ${tone === opt.id ? 'border-cherry bg-cherry/5 text-cherry ring-1 ring-cherry' : 'border-gray-200 hover:bg-gray-50 text-ink'}`}
                        >
                            <span className="font-bold text-sm">{opt.label}</span>
                            {tone === opt.id && <div className="w-2 h-2 bg-cherry rounded-full" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

const StepAnalysis = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] animate-[fadeIn_0.3s_ease-out]">
        <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cherry border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
                🍒
            </div>
        </div>
        <h3 className="text-xl font-black text-ink mb-2">AI가 글을 쓰고 있어요!</h3>
        <p className="text-gray-500 text-sm">잠시만 기다려주세요...</p>
    </div>
);

const StepResult = ({ result, setResult, onRegenerate }: any) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        alert('내용이 복사되었습니다!');
    };

    return (
        <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
            <section className="bg-white p-5 rounded-[20px] shadow-sm border-2 border-cherry/10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-cherry flex items-center gap-2">
                        <Sparkles size={16} />
                        AI 생성 결과
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy} // Added Copy Feature
                            className="text-xs font-bold text-gray-400 hover:text-ink flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Copy size={12} />
                            복사
                        </button>
                        <button
                            onClick={onRegenerate}
                            className="text-xs font-bold text-gray-400 hover:text-cherry flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <RefreshCw size={12} />
                            다시
                        </button>
                    </div>
                </div>

                <TextArea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="h-80 text-base text-ink focus:border-cherry/30"
                />
            </section>
        </div>
    );
};
