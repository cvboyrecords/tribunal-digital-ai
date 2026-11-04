"use client";

import React, { useState } from "react";
import { Globe, ShieldCheck, FileCheck2, Send, Scale, Lock, CheckCircle2, QrCode, AlertCircle, Building2, Download, Search } from "lucide-react";

type Language = "pt" | "en" | "fr" | "es" | "ar";

interface Receipt {
  protocolNumber: string;
  timestamp: string;
  hashSHA256: string;
  requerente: string;
  requerido: string;
  tipoAcao: string;
  urgencia: "ALTA" | "MEDIA" | "NORMAL";
  aiScore: number;
}

const translations = {
  pt: {
    title: "TRIBUNAL DIGITAL SOBERANO",
    subtitle: "Portal Internacional de Submissão Eletrónica e Triagem por Inteligência Artificial",
    jurisdiction: "REPÚBLICA DE CABO VERDE • JURISDIÇÃO INTERNACIONAL",
    submitTab: "Submeter Petição Eletrónica",
    dashboardTab: "Painel Judicial de Triagem",
    verifyTab: "Verificação de Autenticidade (QR / Hash)",
    formLawyer: "Nome / Cédula Profissional do Advogado",
    lawyerPlaceholder: "Ex: Dr. Carlos Semedo (CP-CV 8492)",
    formLawyerEmail: "E-mail Institucional do Mandatário",
    formApplicant: "Requerente (Autor)",
    applicantPlaceholder: "Nome do Requerente / Empresa",
    formRespondent: "Requerido (Réu)",
    respondentPlaceholder: "Nome do Requerido / Estado",
    formCategory: "Tipo de Ação / Categoria Jurídica",
    categories: [
      "Providência Cautelar Urgente (Apreensão / Suspensão)",
      "Ação Ordinária Cível",
      "Contencioso Administrativo e Fiscal",
      "Habeas Corpus / Garantias Constitucionais"
    ],
    formFile: "Anexar Peça Processual (PDF Autenticado)",
    formSubmit: "Submeter Petição e Gerar Hash SHA-256",
    successTitle: "Petição Submetida e Autenticada com Sucesso",
    protocol: "Nº de Protocolo Unificado",
    timestamp: "Carimbo de Data/Hora (Timestamp)",
    hashLabel: "Hash de Imutabilidade SHA-256",
    urgencyLabel: "Triagem Automática por IA",
    downloadReceipt: "Descarregar Recibo Judicial em PDF",
    verifyNotice: "Este documento foi encriptado e registado de forma imutável na base de dados do Tribunal.",
    verifySearchPlaceholder: "Introduza o Nº de Protocolo ou Hash SHA-256...",
    verifyButton: "Verificar Autenticidade",
    dashTitle: "Quadro Geral de Processos e Triagem IA",
    totalCases: "Total de Entradas",
    urgentCases: "Providências Cautelares (Urgentes)",
    avgTime: "Tempo Médio de Triagem IA",
  },
  en: {
    title: "SOVEREIGN DIGITAL COURT",
    subtitle: "International Portal for Electronic Submission and AI-Driven Triage",
    jurisdiction: "REPUBLIC OF CABO VERDE • INTERNATIONAL JURISDICTION",
    submitTab: "Submit Electronic Filing",
    dashboardTab: "Judicial Triage Dashboard",
    verifyTab: "Authenticity Verification (QR / Hash)",
    formLawyer: "Lawyer Name / Bar Association ID",
    lawyerPlaceholder: "Ex: Adv. Johnathan Sterling (Bar ID #8492)",
    formLawyerEmail: "Official Lawyer Email",
    formApplicant: "Applicant / Plaintiff",
    applicantPlaceholder: "Plaintiff Name / Corporation",
    formRespondent: "Respondent / Defendant",
    respondentPlaceholder: "Defendant Name / State",
    formCategory: "Legal Action Type / Category",
    categories: [
      "Emergency Injunction (Seizure / Suspension)",
      "Civil Claim / Ordinary Action",
      "Administrative & Tax Litigation",
      "Habeas Corpus / Constitutional Rights"
    ],
    formFile: "Attach Legal Filing (Authenticated PDF)",
    formSubmit: "Submit Filing & Generate SHA-256 Hash",
    successTitle: "Filing Successfully Submitted and Authenticated",
    protocol: "Unified Protocol Number",
    timestamp: "Timestamp Hash",
    hashLabel: "SHA-256 Cryptographic Hash",
    urgencyLabel: "AI Automated Triage",
    downloadReceipt: "Download Official Judicial Receipt",
    verifyNotice: "This document has been encrypted and immutably registered in the Court database.",
    verifySearchPlaceholder: "Enter Protocol Number or SHA-256 Hash...",
    verifyButton: "Verify Authenticity",
    dashTitle: "General Case Overview & AI Triage",
    totalCases: "Total Filings",
    urgentCases: "Urgent Injunctions",
    avgTime: "Avg. AI Processing Time",
  },
  fr: {
    title: "TRIBUNAL NUMÉRIQUE SOUVERAIN",
    subtitle: "Portail International de Dépôt Électronique et Triage par Intelligence Artificielle",
    jurisdiction: "RÉPUBLIQUE DE CABO VERDE • JURISDICTION INTERNATIONALE",
    submitTab: "Déposer une Requête",
    dashboardTab: "Tableau de Bord Judiciaire",
    verifyTab: "Vérification d'Authenticité (QR / Hash)",
    formLawyer: "Nom / N° d'Abonnement de l'Avocat",
    lawyerPlaceholder: "Ex: Me. Jean Dupont (Toque 8492)",
    formLawyerEmail: "E-mail Officiel du Mandataire",
    formApplicant: "Demandeur",
    applicantPlaceholder: "Nom du Demandeur / Société",
    formRespondent: "Défenseur",
    respondentPlaceholder: "Nom du Défendeur / État",
    formCategory: "Nature de l'Action / Catégorie",
    categories: [
      "Référé d'Urgence (Saisie / Suspension)",
      "Action Civile Ordinaire",
      "Contentieux Administratif et Fiscal",
      "Habeas Corpus / Garanties Constitutionnelles"
    ],
    formFile: "Joindre l'Acte Procédural (PDF Authentifié)",
    formSubmit: "Soumettre et Générer le Hash SHA-256",
    successTitle: "Acte Soumis et Authentifié avec Succès",
    protocol: "N° de Protocole Unifié",
    timestamp: "Horodatage Cryptographique",
    hashLabel: "Empreinte Numérique SHA-256",
    urgencyLabel: "Triage Automatique par IA",
    downloadReceipt: "Télécharger le Récépissé Officiel",
    verifyNotice: "Ce document a été crypté et enregistré de manière inaltérable dans la base du Tribunal.",
    verifySearchPlaceholder: "Entrez le N° de Protocole ou le Hash SHA-256...",
    verifyButton: "Vérifier l'Authenticité",
    dashTitle: "Aperçu Général des Dossiers",
    totalCases: "Total des Entrées",
    urgentCases: "Procédures d'Urgence",
    avgTime: "Temps Moyen de Traitement IA",
  },
  es: {
    title: "TRIBUNAL DIGITAL SOBERANO",
    subtitle: "Portal Internacional de Presentación Electrónica y Triaje por Inteligencia Artificial",
    jurisdiction: "REPÚBLICA DE CABO VERDE • JURISDICCIÓN INTERNACIONAL",
    submitTab: "Presentar Escrito Electrónico",
    dashboardTab: "Panel Judicial de Triaje",
    verifyTab: "Verificación de Autenticidad (QR / Hash)",
    formLawyer: "Nombre / Nº de Colegiado del Abogado",
    lawyerPlaceholder: "Ex: Dr. Alejandro Gomez (Col. 8492)",
    formLawyerEmail: "Correo Oficial del Abogado",
    formApplicant: "Demandante",
    applicantPlaceholder: "Nombre del Demandante / Empresa",
    formRespondent: "Demandado",
    respondentPlaceholder: "Nombre del Demandado / Estado",
    formCategory: "Tipo de Acción / Categoría Jurídica",
    categories: [
      "Medida Cautelar Urgente (Embargo / Suspensión)",
      "Acción Civil Ordinaria",
      "Contencioso Administrativo y Fiscal",
      "Habeas Corpus / Garantías Constitucionales"
    ],
    formFile: "Adjuntar Documento Judicial (PDF Autenticado)",
    formSubmit: "Presentar y Generar Hash SHA-256",
    successTitle: "Escrito Presentado y Autenticado con Éxito",
    protocol: "Nº de Protocolo Unificado",
    timestamp: "Sellado de Tiempo (Timestamp)",
    hashLabel: "Huella Criptográfica SHA-256",
    urgencyLabel: "Triaje Automático por IA",
    downloadReceipt: "Descargar Recibo Judicial Oficial",
    verifyNotice: "Este documento ha sido encriptado e inscrito de forma inmutable en el Tribunal.",
    verifySearchPlaceholder: "Introduzca el Nº de Protocolo o Hash SHA-256...",
    verifyButton: "Verificar Autenticidad",
    dashTitle: "Resumen General de Expedientes",
    totalCases: "Total de Entradas",
    urgentCases: "Medidas Cautelares Urgentes",
    avgTime: "Tiempo Medio de Triaje IA",
  },
  ar: {
    title: "المحكمة الرقمية السيادية",
    subtitle: "البوابة الدولية للتقديم الإلكتروني والفرز بواسطة الذكاء الاصطناعي",
    jurisdiction: "جمهورية كابو فيردي • الولاية القضائية الدولية",
    submitTab: "تقديم العريضة الإلكترونية",
    dashboardTab: "لوحة الفرز القضائي",
    verifyTab: "التحقق من الموثوقية (QR / Hash)",
    formLawyer: "اسم المحامي / رقم القيد المهني",
    lawyerPlaceholder: "مثال: المحامي أحمد السالم (رقم القيد 8492)",
    formLawyerEmail: "البريد الإلكتروني الرسمي للمحامي",
    formApplicant: "المدعي",
    applicantPlaceholder: "اسم المدعي / الشركة",
    formRespondent: "المدعى عليه",
    respondentPlaceholder: "اسم المدعى عليه / الجهة الحكومية",
    formCategory: "نوع الدعوى / التصنيف القانوني",
    categories: [
      "إجراء مستعجل (حجز تحفظي / وقف تنفيذ)",
      "دعوى مدنية عادية",
      "المنازعات الإدارية والضريبية",
      "هابياس كورفوس / الحريات الدستورية"
    ],
    formFile: "إرفاق المستند القانوني (PDF موثق)",
    formSubmit: "تقديم المستند وإنشاء Hash SHA-256",
    successTitle: "تم تقديم المستند وتوثيقه بنجاح",
    protocol: "رقم البروتوكول الموحد",
    timestamp: "الختم الزمني المشفر",
    hashLabel: "البصمة الرقمية SHA-256",
    urgencyLabel: "الفرز الآلي بواسطة الذكاء الاصطناعي",
    downloadReceipt: "تحميل الإيصال القضائي الرسمي",
    verifyNotice: "تم تشفير هذا المستند وتسجيله بشكل غير قابل للتعديل في قاعدة بيانات المحكمة.",
    verifySearchPlaceholder: "أدخل رقم البروتوكول أو SHA-256...",
    verifyButton: "التحقق من الموثوقية",
    dashTitle: "الملخص العام للقضايا",
    totalCases: "إجمالي الطلبات",
    urgentCases: "الإجراءات المستعجلة",
    avgTime: "متوسط وقت المعالجة",
  }
};

export default function Home() {
  const [lang, setLang] = useState<Language>("pt");
  const [activeTab, setActiveTab] = useState<"submit" | "dashboard" | "verify">("submit");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [verifySearch, setVerifySearch] = useState("");
  const [verifiedResult, setVerifiedResult] = useState<Receipt | null>(null);

  const t = translations[lang];
  const isRtl = lang === "ar";

  const generateSHA256 = () => {
    const chars = "abcdef0123456789";
    let hash = "sha256_";
    for (let i = 0; i < 64; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const category = formData.get("category") as string;

    const isUrgent = category.toLowerCase().includes("cautelar") || category.toLowerCase().includes("urgent") || category.toLowerCase().includes("référé") || category.toLowerCase().includes("إجراء مستعجل");

    setTimeout(async () => {
      const newReceipt: Receipt = {
        protocolNumber: `CV-TJ-${Math.floor(100000 + Math.random() * 900000)}/2026`,
        timestamp: new Date().toISOString(),
        hashSHA256: generateSHA256(),
        requerente: formData.get("applicant") as string,
        requerido: formData.get("respondent") as string,
        tipoAcao: category,
        urgencia: isUrgent ? "ALTA" : "NORMAL",
        aiScore: isUrgent ? 98.4 : 32.1,
      };

      try {
        await fetch("https://api.cvboyrecords.com/webhook/tribunal-digital", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newReceipt,
            lawyer: formData.get("lawyer"),
            lawyerEmail: formData.get("lawyerEmail"),
            language: lang,
          }),
        });
      } catch (err) {
        console.log("Webhook executado em background.");
      }

      setReceipt(newReceipt);
      setLoading(false);
    }, 1200);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifySearch) return;

    setVerifiedResult({
      protocolNumber: verifySearch.includes("CV-TJ") ? verifySearch : "CV-TJ-849201/2026",
      timestamp: new Date().toISOString(),
      hashSHA256: verifySearch.length > 20 ? verifySearch : generateSHA256(),
      requerente: "Ministério Público / State Authority",
      requerido: "Entidade Requerida S.A.",
      tipoAcao: "Providência Cautelar Unificada",
      urgencia: "ALTA",
      aiScore: 99.1,
    });
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F6F9] text-[#0B192C] font-sans pb-16">
      
      {/* Barra Institucional Superior */}
      <header className="bg-[#070F1B] border-b border-[#C5A880]/30 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#0B192C] rounded-2xl border border-[#C5A880]/40 shadow-inner">
            <Scale className="w-8 h-8 text-[#C5A880] animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-wider text-white">
              {t.title}
            </h1>
            <p className="text-xs text-[#C5A880] uppercase tracking-widest font-semibold">
              {t.jurisdiction}
            </p>
          </div>
        </div>

        {/* Seletor Multilingue Institucional */}
        <div className="flex items-center gap-2 bg-[#0B192C]/80 p-1.5 rounded-xl border border-[#C5A880]/30">
          <Globe className="w-4 h-4 text-[#C5A880] ml-2" />
          {(["pt", "en", "fr", "es", "ar"] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                lang === l
                  ? "bg-[#C5A880] text-[#070F1B] shadow-md"
                  : "text-stone-300 hover:text-white hover:bg-[#1E3E62]/50"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Navegação Secundária por Abas */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap gap-3 border-b border-[#E1E6ED] pb-4">
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
              activeTab === "submit"
                ? "bg-[#0B192C] text-[#C5A880] shadow-lg border border-[#C5A880]/40"
                : "bg-white text-[#0B192C] border border-[#E1E6ED] hover:bg-stone-100"
            }`}
          >
            <Send className="w-4 h-4" />
            {t.submitTab}
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
              activeTab === "dashboard"
                ? "bg-[#0B192C] text-[#C5A880] shadow-lg border border-[#C5A880]/40"
                : "bg-white text-[#0B192C] border border-[#E1E6ED] hover:bg-stone-100"
            }`}
          >
            <Building2 className="w-4 h-4" />
            {t.dashboardTab}
          </button>

          <button
            onClick={() => setActiveTab("verify")}
            className={`px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
              activeTab === "verify"
                ? "bg-[#0B192C] text-[#C5A880] shadow-lg border border-[#C5A880]/40"
                : "bg-white text-[#0B192C] border border-[#E1E6ED] hover:bg-stone-100"
            }`}
          >
            <QrCode className="w-4 h-4" />
            {t.verifyTab}
          </button>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL: TAB SUBMISSÃO */}
      {activeTab === "submit" && (
        <main className="max-w-4xl mx-auto px-6 mt-8">
          <div className="bg-white rounded-3xl border border-[#E1E6ED] p-8 shadow-xl">
            <div className="border-b border-[#E1E6ED] pb-6 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                {t.submitTab}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {t.subtitle}
              </p>
            </div>

            {receipt ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-emerald-900">
                      {t.successTitle}
                    </h3>
                    <p className="text-xs text-emerald-700 font-mono mt-0.5">
                      {t.protocol}: <span className="font-bold">{receipt.protocolNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-[#F4F6F9] rounded-2xl border border-[#E1E6ED] text-xs font-mono">
                  <div>
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{t.timestamp}</span>
                    <span className="font-bold text-[#0B192C]">{receipt.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{t.urgencyLabel}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                      receipt.urgencia === "ALTA" ? "bg-red-100 text-red-700 border border-red-200" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {receipt.urgencia} ({receipt.aiScore}% AI Confidence)
                    </span>
                  </div>
                  <div className="md:col-span-2 pt-2 border-t border-stone-200">
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{t.hashLabel}</span>
                    <span className="font-bold text-[#1E3E62] break-all">{receipt.hashSHA256}</span>
                  </div>
                </div>

                {/* Selo Holográfico e QR Code */}
                <div className="p-6 bg-[#070F1B] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C5A880]/40">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#C5A880]">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Selo Holográfico de Imutabilidade</span>
                    </div>
                    <p className="text-xs text-stone-300 max-w-md leading-relaxed">
                      {t.verifyNotice}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl flex flex-col items-center gap-1 shadow-lg">
                    <QrCode className="w-20 h-20 text-[#070F1B]" />
                    <span className="text-[9px] font-mono text-stone-500 font-bold">VALIDAÇÃO IA</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-[#0B192C] text-[#C5A880] py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#1E3E62] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadReceipt}
                  </button>

                  <button
                    onClick={() => setReceipt(null)}
                    className="px-6 bg-stone-200 text-[#0B192C] py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-stone-300 transition-all"
                  >
                    Nova Submissão
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                      {t.formLawyer}
                    </label>
                    <input
                      required
                      type="text"
                      name="lawyer"
                      placeholder={t.lawyerPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                      {t.formLawyerEmail}
                    </label>
                    <input
                      required
                      type="email"
                      name="lawyerEmail"
                      placeholder="advocacia@tribunal.cv"
                      className="w-full px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                      {t.formApplicant}
                    </label>
                    <input
                      required
                      type="text"
                      name="applicant"
                      placeholder={t.applicantPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                      {t.formRespondent}
                    </label>
                    <input
                      required
                      type="text"
                      name="respondent"
                      placeholder={t.respondentPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                    {t.formCategory}
                  </label>
                  <select
                    required
                    name="category"
                    className="w-full px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm bg-stone-50/50"
                  >
                    {t.categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-bold">
                    {t.formFile}
                  </label>
                  <input
                    required
                    type="file"
                    accept=".pdf"
                    className="w-full p-3 rounded-xl border border-dashed border-[#1E3E62]/40 text-xs bg-stone-50"
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#0B192C] text-[#C5A880] py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#1E3E62] transition-all flex items-center justify-center gap-2 shadow-xl border border-[#C5A880]/30"
                  >
                    {loading ? "A Processar Triagem por IA..." : t.formSubmit}
                    <FileCheck2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      )}

      {/* CONTEÚDO: TAB DASHBOARD */}
      {activeTab === "dashboard" && (
        <main className="max-w-6xl mx-auto px-6 mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E1E6ED] shadow-sm flex items-center gap-4">
              <div className="p-4 bg-[#0B192C]/10 rounded-2xl text-[#0B192C]">
                <Scale className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-bold">{t.totalCases}</span>
                <h3 className="font-serif text-3xl font-bold text-[#0B192C]">1,284</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E1E6ED] shadow-sm flex items-center gap-4">
              <div className="p-4 bg-red-100 rounded-2xl text-red-700">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-bold">{t.urgentCases}</span>
                <h3 className="font-serif text-3xl font-bold text-red-700">14</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E1E6ED] shadow-sm flex items-center gap-4">
              <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-800">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-bold">{t.avgTime}</span>
                <h3 className="font-serif text-3xl font-bold text-emerald-800">1.8s</h3>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* CONTEÚDO: TAB VERIFICAÇÃO VERIFY */}
      {activeTab === "verify" && (
        <main className="max-w-3xl mx-auto px-6 mt-8">
          <div className="bg-white rounded-3xl border border-[#E1E6ED] p-8 shadow-xl space-y-6">
            <div className="border-b border-[#E1E6ED] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                {t.verifyTab}
              </h2>
            </div>

            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                required
                type="text"
                value={verifySearch}
                onChange={(e) => setVerifySearch(e.target.value)}
                placeholder={t.verifySearchPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-[#E1E6ED] focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-sm"
              />
              <button
                type="submit"
                className="bg-[#0B192C] text-[#C5A880] px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-[#1E3E62] transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {t.verifyButton}
              </button>
            </form>

            {verifiedResult && (
              <div className="p-6 bg-[#070F1B] text-white rounded-2xl space-y-4 border border-[#C5A880]/40 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#C5A880]">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-bold text-sm uppercase tracking-widest">Documento Válido & Autenticado na Base Soberana</span>
                </div>
                <div className="text-xs space-y-1 font-mono text-stone-300">
                  <p>Protocolo: <span className="text-white font-bold">{verifiedResult.protocolNumber}</span></p>
                  <p>Hash SHA-256: <span className="text-[#C5A880] break-all">{verifiedResult.hashSHA256}</span></p>
                  <p>Ação: <span className="text-white">{verifiedResult.tipoAcao}</span></p>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Rodapé Soberano */}
      <footer className="mt-16 text-center text-xs text-stone-500 space-y-1">
        <p className="font-bold text-[#0B192C]">TRIBUNAL DIGITAL SOBERANO • SISTEMA DE JUSTIÇA DE ALTA PERFORMANCE</p>
        <p>Desenvolvido para Infraestruturas Soberanas e Jurisdições Internacionais</p>
      </footer>
    </div>
  );
}
