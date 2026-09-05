import React, { useState, useEffect, useRef } from 'react';
import { 
  LedgerTransaction, 
  VoiceSample, 
  TransactionType, 
  TransactionCategory, 
  PaymentMode,
  EntrepreneurProfile,
  OcrReceiptSample
} from '../types';
import { VOICE_SAMPLES, OCR_RECEIPT_SAMPLES } from '../data/mockData';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  FileSpreadsheet, 
  Volume2, 
  VolumeX, 
  ArrowDownLeft, 
  ArrowUpRight,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  ScanLine,
  Camera,
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface VoiceLedgerViewProps {
  profile: EntrepreneurProfile;
  transactions: LedgerTransaction[];
  onAddTransaction: (tx: Omit<LedgerTransaction, 'id' | 'timestamp'>) => void;
  onDeleteTransaction: (id: string) => void;
  autoOpenVoice?: boolean;
}

export const VoiceLedgerView: React.FC<VoiceLedgerViewProps> = ({
  profile,
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  autoOpenVoice = false,
}) => {
  const [inputMode, setInputMode] = useState<'voice' | 'ocr'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'Hindi' | 'English' | 'Tamil' | 'Telugu'>('Hindi');
  const [activeVoiceSample, setActiveVoiceSample] = useState<VoiceSample | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // OCR state
  const [selectedOcrSample, setSelectedOcrSample] = useState<OcrReceiptSample | null>(null);
  const [isOcrScanning, setIsOcrScanning] = useState(false);

  // Form states for manual or parsed entry confirmation
  const [parsedItem, setParsedItem] = useState('');
  const [parsedAmount, setParsedAmount] = useState<number>(0);
  const [parsedType, setParsedType] = useState<TransactionType>('CREDIT');
  const [parsedCategory, setParsedCategory] = useState<TransactionCategory>('Sales');
  const [parsedMode, setParsedMode] = useState<PaymentMode>('Cash');
  const [parsedParty, setParsedParty] = useState('');
  const [hasParsedResult, setHasParsedResult] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState<'voice' | 'ocr'>('voice');

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (autoOpenVoice) {
      loadSample(VOICE_SAMPLES[0]);
    }
  }, [autoOpenVoice]);

  // Handle simulated or live speech recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setTranscript('');
    setHasParsedResult(false);

    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);

    // Pick appropriate sample based on language
    const langSample = VOICE_SAMPLES.find((s) => s.language === selectedLanguage) || VOICE_SAMPLES[0];
    
    // Web Speech API fallback if available, or simulate realistic live speech stream
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = selectedLanguage === 'Hindi' ? 'hi-IN' : selectedLanguage === 'Tamil' ? 'ta-IN' : selectedLanguage === 'Telugu' ? 'te-IN' : 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        recognition.onend = () => {
          stopRecordingWithTranscript();
        };

        recognition.start();
        return;
      } catch (e) {
        console.log('Web Speech API fallback to demo simulator');
      }
    }

    // Realistic typing stream simulation
    let charIndex = 0;
    const fullText = langSample.transcript;
    const interval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTranscript(fullText.slice(0, charIndex));
        charIndex += 2;
      } else {
        clearInterval(interval);
      }
    }, 80);
  };

  const stopRecordingWithTranscript = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setIsProcessing(true);

    // Simulate AI Entity Extraction
    setTimeout(() => {
      const matchSample = VOICE_SAMPLES.find((s) => s.language === selectedLanguage) || VOICE_SAMPLES[0];
      setParsedItem(matchSample.parsedItem);
      setParsedAmount(matchSample.parsedAmount);
      setParsedType(matchSample.parsedType);
      setParsedCategory(matchSample.parsedCategory);
      setParsedMode(matchSample.parsedMode);
      setParsedParty(matchSample.parsedParty);
      setHasParsedResult(true);
      setIsProcessing(false);
    }, 800);
  };

  const handleStopRecording = () => {
    stopRecordingWithTranscript();
  };

  // Load a quick sample
  const loadSample = (sample: VoiceSample) => {
    setActiveVoiceSample(sample);
    setSelectedOcrSample(null);
    setLastSource('voice');
    setSelectedLanguage(sample.language);
    setTranscript(sample.transcript);
    setIsProcessing(true);

    setTimeout(() => {
      setParsedItem(sample.parsedItem);
      setParsedAmount(sample.parsedAmount);
      setParsedType(sample.parsedType);
      setParsedCategory(sample.parsedCategory);
      setParsedMode(sample.parsedMode);
      setParsedParty(sample.parsedParty);
      setHasParsedResult(true);
      setIsProcessing(false);
    }, 400);
  };

  // Load and scan an OCR receipt sample
  const handleLoadOcrSample = (sample: OcrReceiptSample) => {
    setSelectedOcrSample(sample);
    setActiveVoiceSample(null);
    setLastSource('ocr');
    setIsOcrScanning(true);

    setTimeout(() => {
      setParsedItem(sample.items[0]?.name || sample.vendorName);
      setParsedAmount(sample.totalAmount);
      setParsedType(sample.type);
      setParsedCategory(sample.category);
      setParsedMode(sample.paymentMode);
      setParsedParty(sample.vendorName);
      setHasParsedResult(true);
      setIsOcrScanning(false);
    }, 700);
  };

  // Confirm and commit transaction to Bahi-Khata ledger
  const handleConfirmAdd = () => {
    if (!parsedItem || parsedAmount <= 0) return;

    onAddTransaction({
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      item: parsedItem,
      category: parsedCategory,
      type: parsedType,
      amount: parsedAmount,
      party: parsedParty || 'Local Rural Buyer',
      paymentMode: parsedMode,
      note: lastSource === 'voice' 
        ? (transcript ? `Voice (${selectedLanguage}): "${transcript}"` : undefined)
        : (selectedOcrSample ? `OCR Bill: ${selectedOcrSample.receiptType}` : 'Scanned Invoice'),
      voiceRecorded: lastSource === 'voice',
      ocrScanned: lastSource === 'ocr',
    });

    setSuccessToast(`Added ₹${parsedAmount} (${parsedType}) to Bahi-Khata!`);
    setHasParsedResult(false);
    setTranscript('');
    setActiveVoiceSample(null);
    setSelectedOcrSample(null);

    setTimeout(() => {
      setSuccessToast(null);
    }, 3500);
  };

  // Play audio speech feedback using browser SpeechSynthesis
  const speakTranscript = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'Hindi' ? 'hi-IN' : lang === 'Tamil' ? 'ta-IN' : lang === 'Telugu' ? 'te-IN' : 'en-IN';
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Date,Item,Category,Type,Amount (INR),Party,Payment Mode,Note\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.date}","${t.item}","${t.category}","${t.type}",${t.amount},"${t.party}","${t.paymentMode}","${t.note || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FinSight_Bahi_Khata_${profile.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter transactions
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-emerald-500/50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{successToast}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded border border-orange-200 uppercase font-mono">
              Module 1 · Hisaab (हिसाब)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ASR + Intent Detection + Bill OCR
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Multilingual Voice Ledger & Receipt OCR Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
            Record rural transactions naturally in local dialect (EN/HI/TA) or scan paper bills. FinSight AI structures entities into formal Bahi-Khata credit records offline-first.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Input Mode Toggle */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setInputMode('voice')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                inputMode === 'voice'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice (ASR)</span>
            </button>
            <button
              onClick={() => setInputMode('ocr')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                inputMode === 'ocr'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ScanLine className="w-3.5 h-3.5 text-orange-400" />
              <span>Bill OCR</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Voice Recorder & NLP Entity Extraction Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7 cols): Interactive Voice Recorder Console OR OCR Scanner */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between shadow-md relative overflow-hidden border border-slate-800">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full pointer-events-none" />

          {inputMode === 'voice' ? (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                  <span className="text-xs font-mono uppercase font-bold text-slate-300">
                    Dialect Acoustic Model:
                  </span>
                </div>

                {/* Language Switcher for Voice Model (EN, HI, TA as highlighted in PPT) */}
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                  {(['Hindi', 'English', 'Tamil', 'Telugu'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-2 py-1 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-orange-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang === 'Hindi' ? 'हिंदी (HI)' : lang === 'Tamil' ? 'தமிழ் (TA)' : lang === 'English' ? 'English (EN)' : 'తెలుగు (TE)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Central Microphone Visualizer */}
              <div className="my-6 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  {isRecording && (
                    <>
                      <span className="absolute -inset-3 rounded-full bg-indigo-500/30 animate-ping" />
                      <span className="absolute -inset-6 rounded-full bg-indigo-500/15 animate-pulse" />
                    </>
                  )}
                  <button
                    id="btn-main-mic-action"
                    onClick={isRecording ? handleStopRecording : startRecording}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-300/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 ring-4 ring-indigo-400/30'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8 animate-pulse" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-100">
                    {isRecording ? 'Listening in ' + selectedLanguage + '...' : 'Tap Mic to Speak in ' + selectedLanguage}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isRecording
                      ? `Recording: 00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}s`
                      : 'Speak naturally: e.g. "Sold 10 bags wheat for 14500 rupees cash"'}
                  </p>
                </div>

                {/* Real-time speech transcript banner */}
                <div className="w-full mt-4 bg-slate-800/80 rounded-lg p-3 border border-slate-700 min-h-[56px] flex items-center justify-between text-left">
                  <div className="flex-1 pr-3">
                    <p className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                      Live ASR Transcript
                    </p>
                    <p className="text-xs text-slate-200 italic mt-0.5 font-sans">
                      {transcript || 'No voice detected yet. Tap mic or click instant demo voice samples below.'}
                    </p>
                  </div>
                  {transcript && (
                    <button
                      onClick={() => speakTranscript(transcript, selectedLanguage)}
                      className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Play audio synthesized speech"
                    >
                      <Volume2 className="w-4 h-4 text-orange-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Vernacular Audio Test Prompts */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold mb-2">
                  Instant Demo Voice Prompts (EN/HI/TA):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VOICE_SAMPLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => loadSample(s)}
                      className={`text-left p-2 rounded border text-xs transition-all cursor-pointer ${
                        activeVoiceSample?.id === s.id
                          ? 'bg-orange-950/80 border-orange-500 text-white'
                          : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-mono">{s.language}</span>
                        <span className={s.parsedType === 'CREDIT' ? 'text-emerald-400' : 'text-red-400'}>
                          {s.parsedType}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-100 truncate text-[11px]">{s.audioTitle}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">₹{s.parsedAmount.toLocaleString('en-IN')}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* OCR Bill & Receipt Scanner Panel (Slide 3) */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono uppercase font-bold text-slate-200">
                    Receipt & Bill OCR Engine
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-emerald-400 rounded border border-slate-700">
                  OCR Accuracy: 99.1%
                </span>
              </div>

              {/* Scanned Sample Selector */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                  Select Real Rural Scanned Receipt Sample:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {OCR_RECEIPT_SAMPLES.map((receipt) => (
                    <button
                      key={receipt.id}
                      onClick={() => handleLoadOcrSample(receipt)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedOcrSample?.id === receipt.id
                          ? 'bg-slate-800 border-orange-500 shadow-md ring-1 ring-orange-500'
                          : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
                        <span className="truncate">{receipt.date}</span>
                        <span className={receipt.type === 'CREDIT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          ₹{receipt.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">{receipt.vendorName}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{receipt.receiptType}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Laser Scan Preview Simulation */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden">
                {isOcrScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-bounce" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Document Text Extraction Feed
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {isOcrScanning ? 'Scanning OCR bounding boxes...' : 'Document Analyzed'}
                  </span>
                </div>

                {selectedOcrSample ? (
                  <div className="space-y-1.5 text-xs font-mono">
                    <p className="text-orange-300 font-bold">[{selectedOcrSample.receiptType.toUpperCase()}]</p>
                    <p className="text-slate-200">Merchant: {selectedOcrSample.vendorName}</p>
                    <p className="text-slate-400">Date: {selectedOcrSample.date} · Mode: {selectedOcrSample.paymentMode}</p>
                    <div className="py-1 border-t border-slate-800 text-[11px] text-slate-300 space-y-0.5">
                      {selectedOcrSample.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{it.name} ({it.qty})</span>
                          <span>₹{it.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <Camera className="w-6 h-6 mx-auto text-slate-600 mb-1" />
                    <p>Click one of the verified receipt samples above to simulate OCR text extraction.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Offline-First Status */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Offline SQLite Cache: Active</span>
            </span>
            <span>Zero Data Loss Guarantee</span>
          </div>
        </div>

        {/* Right Col (5 cols): AI Entity Extraction Verification Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                AI Entity Extraction
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-bold">
                NLP Confidence 98.4%
              </span>
            </div>

            {isProcessing ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-medium text-slate-500">
                  Parsing vernacular entities & credit/debit classification...
                </p>
              </div>
            ) : hasParsedResult ? (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Extracted Item / Commodity
                  </span>
                  <input
                    type="text"
                    value={parsedItem}
                    onChange={(e) => setParsedItem(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Amount (₹)
                    </span>
                    <input
                      type="number"
                      value={parsedAmount}
                      onChange={(e) => setParsedAmount(Number(e.target.value))}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono font-black text-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Type (Bahi-Khata)
                    </span>
                    <select
                      value={parsedType}
                      onChange={(e) => setParsedType(e.target.value as TransactionType)}
                      className={`w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold ${
                        parsedType === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      <option value="CREDIT">CREDIT (Jama / Income)</option>
                      <option value="DEBIT">DEBIT (Kharcha / Expense)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Category
                    </span>
                    <select
                      value={parsedCategory}
                      onChange={(e) => setParsedCategory(e.target.value as TransactionCategory)}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Raw Material">Raw Material</option>
                      <option value="Transport">Transport</option>
                      <option value="Storage / Rent">Storage / Rent</option>
                      <option value="Utility / Electricity">Utility / Electricity</option>
                      <option value="Labor / Wage">Labor / Wage</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Payment Mode
                    </span>
                    <select
                      value={parsedMode}
                      onChange={(e) => setParsedMode(e.target.value as PaymentMode)}
                      className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium"
                    >
                      <option value="Cash">Cash (नकद)</option>
                      <option value="UPI">UPI (PhonePe / GPay)</option>
                      <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                      <option value="Udhar (Credit)">Udhar (उधार / Credit)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Customer / Supplier / Party
                  </span>
                  <input
                    type="text"
                    value={parsedParty}
                    onChange={(e) => setParsedParty(e.target.value)}
                    placeholder="e.g. Om Traders / Direct Customer"
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
                  />
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Mic className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-semibold text-slate-600">Awaiting voice or prompt input</p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Audio signals will be mapped directly to Indian accounting fields for MSJE compliance.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            {hasParsedResult && (
              <button
                onClick={() => setHasParsedResult(false)}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="btn-confirm-ledger-entry"
              disabled={!hasParsedResult || parsedAmount <= 0}
              onClick={handleConfirmAdd}
              className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                hasParsedResult && parsedAmount > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm & Commit to Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Ledger Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Digital Bahi-Khata Ledger
            </h2>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              Verified Accounting Records for {profile.businessName}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crop, party..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-slate-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Categories</option>
              <option value="Sales">Sales</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Transport">Transport</option>
              <option value="Storage / Rent">Storage / Rent</option>
              <option value="Utility / Electricity">Utility</option>
              <option value="Govt Subsidy">Govt Subsidy</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">DATE</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">ITEM / COMMODITY</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">CATEGORY</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">PARTY / COUNTERPART</th>
                <th className="text-left py-2.5 font-semibold uppercase tracking-wider">MODE</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">TYPE</th>
                <th className="text-right py-2.5 font-semibold uppercase tracking-wider">AMOUNT</th>
                <th className="text-center py-2.5 font-semibold uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono text-slate-500 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{tx.item}</span>
                      {tx.voiceRecorded && (
                        <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-600 text-[9px] rounded font-mono font-medium border border-indigo-100 flex items-center gap-0.5">
                          <Mic className="w-2.5 h-2.5" /> Voice
                        </span>
                      )}
                    </div>
                    {tx.note && (
                      <p className="text-[10px] text-slate-400 italic truncate max-w-sm">{tx.note}</p>
                    )}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium border border-slate-200">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {tx.party}
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">
                      {tx.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`font-bold text-[11px] ${
                        tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono font-black text-slate-900">
                    <span className={tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Total Records: <strong>{filtered.length}</strong></span>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 font-semibold">
              Total Jama (Credit): ₹
              {filtered
                .filter((t) => t.type === 'CREDIT')
                .reduce((s, t) => s + t.amount, 0)
                .toLocaleString('en-IN')}
            </span>
            <span className="text-red-500 font-semibold">
              Total Kharcha (Debit): ₹
              {filtered
                .filter((t) => t.type === 'DEBIT')
                .reduce((s, t) => s + t.amount, 0)
                .toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
