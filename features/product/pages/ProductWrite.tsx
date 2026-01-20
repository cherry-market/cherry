import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Check, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '@/shared/constants/categories';
import { Input, TextArea } from '@/shared/ui/Input';
import {
    PRODUCT_IMAGE_UPLOAD_LIMIT,
    PRODUCT_WRITE_MAX_IMAGES_MESSAGE,
    PRODUCT_WRITE_MOCK_IMAGE_URL,
    PRODUCT_WRITE_SUCCESS_MESSAGE
} from '../constants';
import { ROUTES } from '@/shared/constants/routes';

export const ProductWrite: React.FC = () => {
    const navigate = useNavigate();

    // Form States
    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tradeTypes, setTradeTypes] = useState<string[]>(['DIRECT']); // 'DIRECT' | 'DELIVERY'

    // New Feature State
    const [isFreeSharing, setIsFreeSharing] = useState(false);

    // UI States
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    // Derived State for Validation (Simplified for MVP)
    const isValid =
        title.trim().length > 0 &&
        (isFreeSharing || price.length > 0) &&
        tradeTypes.length > 0;

    // --- Effects ---
    useEffect(() => {
        if (isFreeSharing) {
            setPrice('0');
        } else if (price === '0') {
            setPrice('');
        }
    }, [isFreeSharing]);

    // --- Handlers ---

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageUpload = () => {
        if (images.length >= PRODUCT_IMAGE_UPLOAD_LIMIT) {
            alert(PRODUCT_WRITE_MAX_IMAGES_MESSAGE);
            return;
        }
        setImages([...images, PRODUCT_WRITE_MOCK_IMAGE_URL]);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFreeSharing) return;
        const rawValue = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(rawValue))) {
            const formatted = Number(rawValue).toLocaleString();
            setPrice(rawValue === '' ? '' : formatted);
        }
    };

    const toggleTradeType = (type: 'DIRECT' | 'DELIVERY') => {
        if (tradeTypes.includes(type)) {
            setTradeTypes(tradeTypes.filter(t => t !== type));
        } else {
            setTradeTypes([...tradeTypes, type]);
        }
    };

    const handleRegister = () => {
        if (!isValid) return;
        alert(PRODUCT_WRITE_SUCCESS_MESSAGE);
        navigate(ROUTES.ROOT);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-safe max-w-[430px] mx-auto relative shadow-2xl animate-[fadeIn_0.3s_ease-out] flex flex-col">

            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="text-ink p-1">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold text-ink">내 물건 팔기</h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col px-5 py-6 gap-6 overflow-y-auto">

                {/* Section 1: Image Upload */}
                <section className="bg-white p-5 rounded-[20px] shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 mb-3 block">상품 사진을 올려주세요</h3>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar">
                        <button
                            onClick={handleImageUpload}
                            className="flex-shrink-0 w-20 h-20 rounded-xl border border-dashed border-cherry/30 bg-cherry/5 flex flex-col items-center justify-center text-cherry gap-1 active:bg-cherry/10 transition-colors"
                        >
                            <Camera size={24} />
                            <span className="text-xs font-bold">{images.length}/10</span>
                        </button>

                        {images.map((img, idx) => (
                            <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-100 relative">
                                <img src={img} alt="upload" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Basic Info */}
                <section className="bg-white p-5 rounded-[20px] shadow-sm flex flex-col gap-6">
                    {/* Title */}
                    <Input
                        label="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="글 제목을 입력해주세요"
                    />

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">카테고리</label>
                        <div
                            onClick={() => setIsCategoryOpen(true)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer active:bg-gray-100 transition-colors"
                        >
                            <span className={`text-sm font-medium ${category ? 'text-ink' : 'text-gray-400'}`}>
                                {category || '카테고리 선택'}
                            </span>
                            <ChevronRight size={18} className="text-gray-400" />
                        </div>
                    </div>

                    {/* Price & Free Sharing */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-ink">가격</label>
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={isFreeSharing}
                                    onChange={(e) => setIsFreeSharing(e.target.checked)}
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isFreeSharing ? 'bg-cherry border-cherry' : 'border-gray-300 bg-white'}`}>
                                    {isFreeSharing && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className={`text-xs font-bold ${isFreeSharing ? 'text-cherry' : 'text-gray-500'}`}>무료나눔</span>
                            </label>
                        </div>
                        <Input
                            startAdornment={
                                <span className={`font-bold ${price && price !== '0' ? 'text-ink' : 'text-gray-400'}`}>₩</span>
                            }
                            type="text"
                            value={isFreeSharing ? '무료나눔' : price}
                            onChange={handlePriceChange}
                            disabled={isFreeSharing}
                            placeholder="예) 10,000"
                            className="disabled:text-cherry disabled:font-bold"
                        />
                    </div>
                </section>

                {/* Section 3: Description */}
                <section className="bg-white p-5 rounded-[20px] shadow-sm flex flex-col gap-4">
                    <TextArea
                        label="자세한 설명"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
                        className="h-48"
                    />
                </section>

                {/* Section 4: Trade Type */}
                <section className="bg-white p-5 rounded-[20px] shadow-sm">
                    <label className="block text-sm font-bold text-ink mb-3">거래 방식</label>
                    <div className="flex items-center gap-6">
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
                            onClick={() => toggleTradeType('DIRECT')}
                        >
                            <div
                                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${tradeTypes.includes('DIRECT') ? 'bg-cherry border-cherry text-white shadow-md shadow-cherry/20' : 'border-gray-200 bg-gray-50 text-gray-300'}`}
                            >
                                {tradeTypes.includes('DIRECT') && <Check size={16} strokeWidth={3} />}
                            </div>
                            <span className="text-sm font-medium text-ink">직거래</span>
                        </div>

                        <div
                            className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
                            onClick={() => toggleTradeType('DELIVERY')}
                        >
                            <div
                                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${tradeTypes.includes('DELIVERY') ? 'bg-cherry border-cherry text-white shadow-md shadow-cherry/20' : 'border-gray-200 bg-gray-50 text-gray-300'}`}
                            >
                                {tradeTypes.includes('DELIVERY') && <Check size={16} strokeWidth={3} />}
                            </div>
                            <span className="text-sm font-medium text-ink">택배거래</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Sticky Bottom Button */}
            <div className="p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] bg-white border-t border-gray-100 sticky bottom-0 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button
                    onClick={handleRegister}
                    disabled={!isValid}
                    className="w-full bg-cherry text-white font-black py-4 rounded-xl shadow-lg shadow-cherry/30 active:scale-95 transition-all text-lg flex justify-center items-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:pointer-events-none"
                >
                    <Check size={20} />
                    등록하기
                </button>
            </div>

            {/* Category Modal (BottomSheet style) */}
            {isCategoryOpen && (
                <div className="absolute inset-0 z-50 bg-black/50 flex items-end animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white w-full rounded-t-[24px] pb-safe animate-[slideUp_0.3s_ease-out] overflow-hidden flex flex-col max-h-[80%] shadow-2xl">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-lg font-bold text-ink">카테고리 선택</h3>
                            <button onClick={() => setIsCategoryOpen(false)} className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4">
                            <div className="grid grid-cols-1 gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setCategory(cat);
                                            setIsCategoryOpen(false);
                                        }}
                                        className={`p-4 text-left rounded-xl font-bold transition-all ${category === cat ? 'bg-cherry/5 text-cherry ring-1 ring-cherry/20' : 'hover:bg-gray-50 text-ink'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
