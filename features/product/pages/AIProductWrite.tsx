import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Sparkles, RefreshCw, ChevronRight, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input, TextArea } from '@/shared/ui/Input';
import {
    AI_WRITE_GENERATION_DELAY_MS,
    AI_WRITE_MOCK_IMAGE_URL,
    AI_WRITE_MOCK_RESULT,
    AI_WRITE_SUCCESS_MESSAGE,
    PRODUCT_IMAGE_UPLOAD_LIMIT,
    PRODUCT_WRITE_MAX_IMAGES_MESSAGE
} from '../constants';
import { ROUTES } from '@/shared/constants/routes';

type WritingStep = 'INPUT' | 'CONFIG' | 'ANALYSIS' | 'RESULT';

export const AIProductWrite: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<WritingStep>('INPUT');

    // Data States
    const [images, setImages] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [extraDesc, setExtraDesc] = useState('');
    const [personality, setPersonality] = useState('FRIENDLY');
    const [tone, setTone] = useState('POLITE');
    const [generatedResult, setGeneratedResult] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Navigation Handlers
    const goNext = () => {
        if (currentStep === 'INPUT') setCurrentStep('CONFIG');
        else if (currentStep === 'CONFIG') handleGenerate(); // Go to generation
        else if (currentStep === 'ANALYSIS') setCurrentStep('RESULT');
    };

    const goBack = () => {
        if (currentStep === 'INPUT') navigate(-1);
        else if (currentStep === 'CONFIG') setCurrentStep('INPUT');
        else if (currentStep === 'RESULT') setCurrentStep('CONFIG'); // Re-config
    };

    const handleImageUpload = () => {
        if (images.length >= PRODUCT_IMAGE_UPLOAD_LIMIT) {
            alert(PRODUCT_WRITE_MAX_IMAGES_MESSAGE);
            return;
        }
        // Mock upload
        setImages([...images, AI_WRITE_MOCK_IMAGE_URL]);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleGenerate = () => {
        setCurrentStep('ANALYSIS');
        setIsGenerating(true);
        // Simulate AI delay
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedResult(AI_WRITE_MOCK_RESULT);
            setCurrentStep('RESULT');
        }, AI_WRITE_GENERATION_DELAY_MS);
    };

    const handleRegister = () => {
        // Mock registration
        alert(AI_WRITE_SUCCESS_MESSAGE);
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
                {/* Step Indicator (Optional) */}
                <div className="text-xs font-bold text-gray-400">
                    {currentStep === 'INPUT' && '1/3'}
                    {currentStep === 'CONFIG' && '2/3'}
                    {(currentStep === 'ANALYSIS' || currentStep === 'RESULT') && '3/3'}
                </div>
            </header>

            <main className="flex-1 flex flex-col px-5 py-6 gap-6 overflow-y-auto">
                {currentStep === 'INPUT' && (
                    <StepInput
                        images={images}
                        onUpload={handleImageUpload}
                        description={description}
                        onDescChange={setDescription}
                        extraDesc={extraDesc}
                        onExtraDescChange={setExtraDesc}
                        onRemove={handleRemoveImage}
                    />
                )}

                {currentStep === 'CONFIG' && (
                    <StepConfig
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
                            <button
                                onClick={goBack}
                                className="flex-1 py-4 rounded-xl font-bold bg-gray-100 text-gray-600 active:scale-95 transition-transform"
                            >
                                이전으로
                            </button>
                            <button
                                onClick={handleRegister}
                                className="flex-[2] py-4 rounded-xl font-bold bg-cherry text-white shadow-lg shadow-cherry/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                등록하기
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={goNext}
                            disabled={currentStep === 'INPUT' && (images.length === 0 || description.trim().length === 0)}
                            className="w-full bg-cherry text-white font-black py-4 rounded-xl shadow-lg shadow-cherry/30 active:scale-95 transition-all text-lg flex justify-center items-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:pointer-events-none"
                        >
                            {currentStep === 'CONFIG' ? (
                                <>
                                    <Sparkles strokeWidth={2.5} size={20} />
                                    AI로 글 작성하기
                                </>
                            ) : (
                                <>
                                    다음
                                    <ChevronRight strokeWidth={3} size={20} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Sub-components for Steps ---

const StepInput = ({ images, onUpload, description, onDescChange, extraDesc, onExtraDescChange, onRemove }: any) => (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <section className="bg-white p-5 rounded-[20px] shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-3">상품 사진을 올려주세요</h3>
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

        <section className="bg-white p-5 rounded-[20px] shadow-sm flex flex-col gap-4">
            <div>
                <Input
                    label="상품에 대해 간단히 알려주세요"
                    value={description}
                    onChange={(e) => onDescChange(e.target.value)}
                    placeholder="예: 아이브 장원영 포카, 미개봉 앨범 💿"
                />
            </div>
            <div>
                <TextArea
                    label="추가 설명 (선택)"
                    value={extraDesc}
                    onChange={(e) => onExtraDescChange(e.target.value)}
                    placeholder="강조하고 싶은 내용을 적어주세요 (최대 200자)"
                    maxLength={200}
                    className="h-32"
                />
                <p className="text-right text-xs text-gray-400 mt-1">{extraDesc.length}/200</p>
            </div>
        </section>
    </div>
);

const StepConfig = ({ personality, setPersonality, tone, setTone }: any) => (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <section className="bg-white p-5 rounded-[20px] shadow-sm">
            <h3 className="text-lg font-bold text-ink mb-6">
                어떤 느낌으로 써드릴까요? 🍒
            </h3>

            <div className="space-y-6">
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
                    <p className="text-sm font-bold text-gray-400 mb-3">말투 선택</p>
                    <div className="grid grid-cols-1 gap-3">
                        <SelectionOption
                            label="음슴체"
                            desc="군더더기 없이 깔끔하게 (상태 좋음, 직거래 가능)"
                            isSelected={tone === 'SHORT'}
                            onClick={() => setTone('SHORT')}
                        />
                        <SelectionOption
                            label="깔끔한 존댓말"
                            desc="예의 바르고 정중하게 (상태 좋아요, 문의 주세요)"
                            isSelected={tone === 'POLITE'}
                            onClick={() => setTone('POLITE')}
                        />
                        <SelectionOption
                            label="여성스러운 말투"
                            desc="부드럽고 친절하게 (상태 좋아용, 연락주세요~)"
                            isSelected={tone === 'SOFT'}
                            onClick={() => setTone('SOFT')}
                        />
                    </div>
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

const StepResult = ({ result, setResult, onRegenerate }: any) => (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <section className="bg-white p-5 rounded-[20px] shadow-sm border-2 border-cherry/10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-cherry flex items-center gap-2">
                    <Sparkles size={16} />
                    AI가 작성한 글이에요
                </h3>
                <button
                    onClick={onRegenerate}
                    className="text-xs font-bold text-gray-400 hover:text-cherry flex items-center gap-1"
                >
                    <RefreshCw size={12} />
                    다시 만들기
                </button>
            </div>

            <TextArea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="h-80 text-base text-ink focus:border-cherry/30"
            />
            <p className="text-xs text-gray-400 mt-2 text-right">
                내용을 자유롭게 수정할 수 있어요
            </p>
        </section>
    </div>
);

const SelectionOption = ({ label, desc, isSelected, onClick }: any) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${isSelected ? 'border-cherry bg-cherry/5 ring-1 ring-cherry' : 'border-gray-200 hover:bg-gray-50'}`}
    >
        <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${isSelected ? 'border-cherry' : 'border-gray-300'}`}>
            {isSelected && <div className="w-2.5 h-2.5 bg-cherry rounded-full" />}
        </div>
        <div>
            <p className={`text-base font-bold ${isSelected ? 'text-cherry' : 'text-ink'}`}>{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
        </div>
    </div>
);
