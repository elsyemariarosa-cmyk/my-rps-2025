import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Target, ListChecks, GitBranch, Calendar, CheckCircle, BarChart3, BookMarked, Plus, Edit, Trash2, Save, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

const CourseRPS = () => {
  const { semester, courseSlug } = useParams();
  const { toast } = useToast();
  
  // Course information state
  const [courseInfo, setCourseInfo] = useState({
    penanggungJawab: "",
    tahunAjaran: "20../20..",
    deskripsiSingkat: "",
    manfaatMataKuliah: [],
    namaMataKuliah: "",
    kodeMataKuliah: "",
    sksMataKuliah: 0,
    semesterMataKuliah: "",
    dosenPengampu: ["", "", ""]
  });
  
  // Editing states for course info
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingBenefits, setEditingBenefits] = useState(false);
  const [editingCourseHeader, setEditingCourseHeader] = useState(false);
  
  // Temporary form states for editing
  const [tempDescription, setTempDescription] = useState("");
  const [tempBenefits, setTempBenefits] = useState("");
  
  // State for editable content - MARS Program CPLs
  const [marsCompleteData] = useState([
    { id: 1, code: "PP-CPL1", title: "Penguasaan Pengetahuan", description: "Menguasai teori dan konsep manajemen, prinsip bisnis visioner serta pelayanan yang islami", bloomLevel: "C5", bgColor: "bg-yellow-200" },
    { id: 2, code: "PP-CPL2", title: "Penguasaan Pengetahuan", description: "Mampu menganalisis faktor internal dan eksternal rumah sakit dengan menggunakan pendekatan Evidence Based Management Practice untuk suistanability organisasi", bloomLevel: "C4", bgColor: "bg-red-200" },
    { id: 3, code: "KU-CPL3", title: "Keterampilan Umum", description: "Mampu menerapkan hasil kajian kritis dan kajian analisis untuk menyelesaikan masalah perumahsakitan dan proses pengambilan keputusan, melalui kolaborasi inter, multi dan trans-disiplin", bloomLevel: "P4 dan C4", bgColor: "bg-green-200" },
    { id: 4, code: "KU-CPL4", title: "Keterampilan Umum", description: "Mampu mengintergrasikan inisiatif, argumen saintifik, data hasil penelitian, serta mampu mengkomunikasikan melalui berbagai media ilmiah", bloomLevel: "P5 dan C4", bgColor: "bg-green-100" },
    { id: 5, code: "KK-CPL5", title: "Keterampilan Khusus", description: "Mampu menghasilkan nilai tambah dalam pengelolaan rumah sakit yang siap menuju smart hospital", bloomLevel: "C5 dan P4", bgColor: "bg-purple-200" },
    { id: 6, code: "KK-CPL6", title: "Keterampilan Khusus", description: "Mampu mengembangkan pelayanan rumah sakit yang efektifitas dan efisiensi menggunakan pendekatan teknologi", bloomLevel: "C6 dan P4", bgColor: "bg-purple-300" }
  ]);
  
  // Selected CPLs for this course
  const [selectedCplIds, setSelectedCplIds] = useState<number[]>([1, 2, 3]);
  
  // Get selected CPL items based on selectedCplIds
  const cplItems = marsCompleteData.filter(cpl => selectedCplIds.includes(cpl.id));
  
  const [cpmkItems, setCpmkItems] = useState<Array<{
    id: number;
    title: string;
    description: string;
    borderColor: string;
    bgColor: string;
    relatedCpl?: string;
  }>>([
    { id: 1, title: "CPMK-1", description: "Mampu memahami dan menjelaskan konsep dasar mata kuliah ini.", borderColor: "border-primary", bgColor: "bg-primary/5" },
    { id: 2, title: "CPMK-2", description: "Mampu menganalisis permasalahan dan memberikan solusi yang tepat.", borderColor: "border-secondary", bgColor: "bg-secondary/5" },
    { id: 3, title: "CPMK-3", description: "Mampu mengimplementasikan konsep dalam situasi nyata.", borderColor: "border-accent", bgColor: "bg-accent/5" }
  ]);

  // Generate CPMK automatically based on selected CPL
  const generateCpmkFromCpl = () => {
    if (selectedCplIds.length === 0) return;
    
    const colors = [
      { borderColor: "border-primary", bgColor: "bg-primary/5" },
      { borderColor: "border-secondary", bgColor: "bg-secondary/5" },
      { borderColor: "border-accent", bgColor: "bg-accent/5" },
      { borderColor: "border-destructive", bgColor: "bg-destructive/5" },
      { borderColor: "border-muted", bgColor: "bg-muted/5" },
      { borderColor: "border-blue-500", bgColor: "bg-blue-50" }
    ];
    
    const newCpmk = selectedCplIds.map((cplId, index) => {
      const cpl = marsCompleteData.find(c => c.id === cplId);
      const colorIndex = index % colors.length;
      
      let cpmkDescription = "";
      
      // Generate CPMK description based on CPL category and content
      switch (cpl?.code) {
        case "PP-CPL1":
          cpmkDescription = "Mampu menguasai dan menerapkan teori dan konsep manajemen serta prinsip bisnis visioner dalam konteks pelayanan kesehatan yang islami sesuai mata kuliah ini.";
          break;
        case "PP-CPL2":
          cpmkDescription = "Mampu menganalisis faktor internal dan eksternal yang mempengaruhi organisasi kesehatan dengan pendekatan Evidence Based Management Practice untuk sustainability.";
          break;
        case "KU-CPL3":
          cpmkDescription = "Mampu menerapkan hasil kajian kritis dan analisis untuk menyelesaikan masalah dalam mata kuliah ini melalui kolaborasi inter, multi dan trans-disiplin.";
          break;
        case "KU-CPL4":
          cpmkDescription = "Mampu mengintegrasikan inisiatif, argumen saintifik, dan data hasil penelitian serta mengkomunikasikannya melalui berbagai media dalam konteks mata kuliah ini.";
          break;
        case "KK-CPL5":
          cpmkDescription = "Mampu menghasilkan nilai tambah dalam pengelolaan pelayanan kesehatan yang mendukung transformasi menuju smart hospital sesuai scope mata kuliah ini.";
          break;
        case "KK-CPL6":
          cpmkDescription = "Mampu mengembangkan pelayanan kesehatan yang efektif dan efisien menggunakan pendekatan teknologi dalam konteks mata kuliah ini.";
          break;
        default:
          cpmkDescription = `Mampu menerapkan kompetensi ${cpl?.title.toLowerCase()} sesuai dengan ${cpl?.description} dalam konteks mata kuliah ini.`;
      }
      
      return {
        id: index + 1,
        title: `CPMK-${index + 1}`,
        description: cpmkDescription,
        borderColor: colors[colorIndex].borderColor,
        bgColor: colors[colorIndex].bgColor,
        relatedCpl: cpl?.code
      };
    });
    
    setCpmkItems(newCpmk);
    toast({ 
      title: "CPMK berhasil digenerate!", 
      description: `${newCpmk.length} CPMK telah dibuat otomatis berdasarkan CPL yang dipilih.` 
    });
  };

  // Add additional CPMK for specific CPL
  const addCpmkForCpl = (cplCode: string) => {
    const cpl = marsCompleteData.find(c => c.code === cplCode);
    if (!cpl) return;

    const existingCpmkForCpl = cpmkItems.filter(item => item.relatedCpl === cplCode);
    const cpmkNumber = existingCpmkForCpl.length + 1;
    
    const colors = [
      { borderColor: "border-primary", bgColor: "bg-primary/5" },
      { borderColor: "border-secondary", bgColor: "bg-secondary/5" },
      { borderColor: "border-accent", bgColor: "bg-accent/5" },
      { borderColor: "border-destructive", bgColor: "bg-destructive/5" },
      { borderColor: "border-muted", bgColor: "bg-muted/5" },
      { borderColor: "border-blue-500", bgColor: "bg-blue-50" }
    ];
    
    const colorIndex = (cpmkItems.length) % colors.length;
    const newId = Math.max(...cpmkItems.map(item => item.id), 0) + 1;
    
    let cpmkDescription = "";
    
    // Generate additional CPMK descriptions based on CPL
    switch (cpl.code) {
      case "PP-CPL1":
        const pp1Descriptions = [
          "Mampu menguasai dan menerapkan teori dan konsep manajemen serta prinsip bisnis visioner dalam konteks pelayanan kesehatan yang islami sesuai mata kuliah ini.",
          "Mampu memahami dan mengimplementasikan nilai-nilai islami dalam praktik manajemen pelayanan kesehatan modern.",
          "Mampu mengevaluasi dan mengoptimalkan sistem manajemen berdasarkan prinsip bisnis visioner yang berkelanjutan."
        ];
        cpmkDescription = pp1Descriptions[cpmkNumber - 1] || pp1Descriptions[0];
        break;
      case "PP-CPL2":
        const pp2Descriptions = [
          "Mampu menganalisis faktor internal dan eksternal yang mempengaruhi organisasi kesehatan dengan pendekatan Evidence Based Management Practice untuk sustainability.",
          "Mampu melakukan assessment komprehensif terhadap lingkungan internal organisasi kesehatan.",
          "Mampu mengembangkan strategi berdasarkan analisis faktor eksternal industri kesehatan."
        ];
        cpmkDescription = pp2Descriptions[cpmkNumber - 1] || pp2Descriptions[0];
        break;
      case "KU-CPL3":
        const ku3Descriptions = [
          "Mampu menerapkan hasil kajian kritis dan analisis untuk menyelesaikan masalah dalam mata kuliah ini melalui kolaborasi inter, multi dan trans-disiplin.",
          "Mampu mengembangkan kemampuan berpikir kritis dalam menganalisis permasalahan kompleks di bidang kesehatan.",
          "Mampu membangun kolaborasi efektif dengan berbagai disiplin ilmu untuk penyelesaian masalah holistik."
        ];
        cpmkDescription = ku3Descriptions[cpmkNumber - 1] || ku3Descriptions[0];
        break;
      case "KU-CPL4":
        const ku4Descriptions = [
          "Mampu mengintegrasikan inisiatif, argumen saintifik, dan data hasil penelitian serta mengkomunikasikannya melalui berbagai media dalam konteks mata kuliah ini.",
          "Mampu mengembangkan inisiatif inovatif berdasarkan evidence-based practice dalam pelayanan kesehatan.",
          "Mampu menyajikan dan mengkomunikasikan hasil kajian ilmiah melalui berbagai platform dan media komunikasi."
        ];
        cpmkDescription = ku4Descriptions[cpmkNumber - 1] || ku4Descriptions[0];
        break;
      case "KK-CPL5":
        const kk5Descriptions = [
          "Mampu menghasilkan nilai tambah dalam pengelolaan pelayanan kesehatan yang mendukung transformasi menuju smart hospital sesuai scope mata kuliah ini.",
          "Mampu mengidentifikasi dan mengimplementasikan inovasi teknologi untuk meningkatkan efisiensi pelayanan kesehatan.",
          "Mampu mengembangkan model pelayanan kesehatan digital yang user-friendly dan patient-centered."
        ];
        cpmkDescription = kk5Descriptions[cpmkNumber - 1] || kk5Descriptions[0];
        break;
      case "KK-CPL6":
        const kk6Descriptions = [
          "Mampu mengembangkan pelayanan kesehatan yang efektif dan efisien menggunakan pendekatan teknologi dalam konteks mata kuliah ini.",
          "Mampu merancang sistem pelayanan kesehatan berbasis teknologi yang mengoptimalkan resource dan outcomes.",
          "Mampu mengevaluasi dan meningkatkan kualitas pelayanan kesehatan melalui implementasi teknologi terkini."
        ];
        cpmkDescription = kk6Descriptions[cpmkNumber - 1] || kk6Descriptions[0];
        break;
      default:
        cpmkDescription = `Mampu menerapkan aspek lanjutan dari ${cpl.title.toLowerCase()} dalam konteks mata kuliah ini (Level ${cpmkNumber}).`;
    }
    
    const newCpmk = {
      id: newId,
      title: `CPMK-${newId}`,
      description: cpmkDescription,
      borderColor: colors[colorIndex].borderColor,
      bgColor: colors[colorIndex].bgColor,
      relatedCpl: cpl.code
    };
    
    setCpmkItems([...cpmkItems, newCpmk]);
    toast({ 
      title: "CPMK berhasil ditambahkan!", 
      description: `CPMK baru dari ${cpl.code} telah ditambahkan.` 
    });
  };

  // Get CPMK grouped by CPL
  const getCpmkGroupedByCpl = () => {
    const grouped: { [key: string]: typeof cpmkItems } = {};
    
    cpmkItems.forEach(cpmk => {
      const cplCode = cpmk.relatedCpl || 'Manual';
      if (!grouped[cplCode]) {
        grouped[cplCode] = [];
      }
      grouped[cplCode].push(cpmk);
    });
    
    return grouped;
  };

  // Auto-generate CPMK when CPL selection changes
  useEffect(() => {
    if (selectedCplIds.length > 0) {
      generateCpmkFromCpl();
    }
  }, [selectedCplIds]);

  // Sub-CPMK state
  const [subCpmkItems, setSubCpmkItems] = useState([
    { id: 1, code: "Sub-CPMK-1", description: "Mampu menjelaskan aspek khusus dari mata kuliah dengan tingkat pemahaman yang mendalam." },
    { id: 2, code: "Sub-CPMK-2", description: "Mampu menganalisis komponen-komponen penting dalam mata kuliah." },
    { id: 3, code: "Sub-CPMK-3", description: "Mampu mengevaluasi dan memberikan rekomendasi berdasarkan pemahaman mata kuliah." },
    { id: 4, code: "Sub-CPMK-4", description: "Mampu mengintegrasikan pengetahuan dengan praktik profesional." },
    { id: 5, code: "Sub-CPMK-5", description: "Mampu mengkomunikasikan hasil pembelajaran secara efektif." }
  ]);

  // Learning activities state - automatically generated from Sub-CPMK
  const [learningActivities, setLearningActivities] = useState<any[]>([]);

  // Update learning activities when Sub-CPMK changes
  const updateLearningActivitiesFromSubCpmk = () => {
    const activities = subCpmkItems.map((subCpmk, index) => ({
      id: subCpmk.id,
      week: index + 1,
      subCpmk: subCpmk.code,
      subCpmkDescription: subCpmk.description,
      indicator: "",
      assessmentCriteria: "",
      assessmentTechnique: "",
      offlineLearning: "",
      onlineLearning: "",
      learningMaterials: "",
      assessmentWeight: ""
    }));
    setLearningActivities(activities);
  };

  // Assessment plan state
  const [assessmentPlan, setAssessmentPlan] = useState<any[]>([]);

  // Task/Exam assessment plan state
  const [taskExamPlan, setTaskExamPlan] = useState<any[]>([
    {
      id: 1,
      judulPenilaian: "UCPMK1: Kuis MyKlass",
      bentukPenilaian: "Ujian online berupa Kuis MyKlass",
      subCpmk: ["Sub-CPMK1", "Sub-CPMK2"],
      deskripsiPenilaian: "UCPMK 1 ini bertujuan untuk mengukur kemampuan mahasiswa dalam mengidentifikasi parameter ancaman dan kerentanan akibat bencana gempa",
      metodePenilaian: "Mahasiswa mengerjakan kuis melalui myklass dengan 1 x attempt, waktu pengerjaan 60 menit, Nilai langsung keluar setelah selesai mengerjakan",
      bentukFormatLuaran: "Luaran berupa score (nilai) yang terecord di Myklass dan terhubung dalam grading nilai",
      indikatorKriteria: "Mengidentifikasi nilai dan hasil (20%)",
      bobotPenilaian: 20,
      jadwalPelaksanaan: "Minggu ke 4 sesuai jadwal perkuliahan",
      pustaka: "pt materi kuliah pekan ke 1 – 3, buku...., video...., dll",
      lainLain: "Mahasiswa dengan nilai kurang dari 66 akan diberikan kesempatan remidi 1x"
    }
  ]);

  // Update assessment plan when CPMK/Sub-CPMK changes
  const updateAssessmentPlanFromCpmk = () => {
    const plan: any[] = [];
    
    cpmkItems.forEach((cpmk) => {
      const relatedSubCpmk = subCpmkItems.filter(subCpmk => 
        subCpmk.code.includes(cpmk.title.split('-')[1]) || 
        subCpmk.code.includes('CPMK')
      );
      
      if (relatedSubCpmk.length > 0) {
        plan.push({
          id: Date.now() + Math.random(),
          week: "",
          cpl: "CPL",
          cpmk: cpmk.title,
          subCpmkList: relatedSubCpmk,
          subCpmkWeights: relatedSubCpmk.reduce((acc, sub) => ({ ...acc, [sub.code]: "" }), {}),
          indicator: "",
          assessmentForm: "",
          cpmkWeight: ""
        });
      }
    });
    
    setAssessmentPlan(plan);
  };

  // Initialize assessment plan from CPMK/Sub-CPMK
  useEffect(() => {
    updateAssessmentPlanFromCpmk();
  }, [cpmkItems, subCpmkItems]);

  // Initialize learning activities from Sub-CPMK
  useEffect(() => {
    updateLearningActivitiesFromSubCpmk();
  }, [subCpmkItems]);

  // Editing states for assessment plan
  const [editingAssessment, setEditingAssessment] = useState<number | null>(null);
  
  // Editing states for task/exam plan
  const [editingTaskExam, setEditingTaskExam] = useState<number | null>(null);
  const [newTaskExamDialog, setNewTaskExamDialog] = useState(false);

  // Assessment plan helper functions
  const updateAssessmentPlan = (id: number, data: any) => {
    setAssessmentPlan(assessmentPlan.map(item => item.id === id ? { ...item, ...data } : item));
    setEditingAssessment(null);
    toast({ title: "Rencana penilaian berhasil diperbarui", description: "Perubahan telah disimpan." });
  };
  
  // Editing states
  const [editingCpmk, setEditingCpmk] = useState<number | null>(null);
  const [editingSubCpmk, setEditingSubCpmk] = useState<number | null>(null);
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [newCpmkDialog, setNewCpmkDialog] = useState(false);
  const [newSubCpmkDialog, setNewSubCpmkDialog] = useState(false);
  const [newActivityDialog, setNewActivityDialog] = useState(false);
  
  // Form states
  const [cpmkForm, setCpmkForm] = useState({ title: "", description: "" });
  const [subCpmkForm, setSubCpmkForm] = useState({ code: "", description: "" });
  const [activityForm, setActivityForm] = useState({
    week: 1,
    subCpmk: "",
    indicator: "",
    assessmentCriteria: "",
    assessmentTechnique: "",
    offlineLearning: "",
    onlineLearning: "",
    learningMaterials: "",
    assessmentWeight: ""
  });

  const [taskExamForm, setTaskExamForm] = useState({
    judulPenilaian: "",
    bentukPenilaian: "",
    subCpmk: [],
    deskripsiPenilaian: "",
    metodePenilaian: "",
    bentukFormatLuaran: "",
    indikatorKriteria: "",
    bobotPenilaian: 0,
    jadwalPelaksanaan: "",
    pustaka: "",
    lainLain: ""
  });

  // Helper functions for CPL selection
  const toggleCplSelection = (cplId: number) => {
    setSelectedCplIds(prev => 
      prev.includes(cplId) 
        ? prev.filter(id => id !== cplId)
        : [...prev, cplId]
    );
    toast({ 
      title: "Pemilihan CPL diperbarui", 
      description: `CPL ${selectedCplIds.includes(cplId) ? 'dihapus dari' : 'ditambahkan ke'} mata kuliah ini.` 
    });
  };

  const selectAllCpl = () => {
    setSelectedCplIds(marsCompleteData.map(cpl => cpl.id));
    toast({ title: "Semua CPL dipilih", description: "Seluruh CPL telah ditambahkan ke mata kuliah ini." });
  };

  const deselectAllCpl = () => {
    setSelectedCplIds([]);
    toast({ title: "Semua CPL dibatalkan", description: "Seluruh CPL telah dihapus dari mata kuliah ini." });
  };

  const addCpmkItem = () => {
    if (cpmkForm.title && cpmkForm.description) {
      const newId = Math.max(...cpmkItems.map(item => item.id)) + 1;
      const colors = ["border-primary bg-primary/5", "border-secondary bg-secondary/5", "border-accent bg-accent/5"];
      const colorIndex = (newId - 1) % colors.length;
      setCpmkItems([...cpmkItems, { 
        id: newId, 
        title: cpmkForm.title, 
        description: cpmkForm.description,
        borderColor: colors[colorIndex].split(' ')[0],
        bgColor: colors[colorIndex].split(' ')[1]
      }]);
      setCpmkForm({ title: "", description: "" });
      setNewCpmkDialog(false);
      toast({ title: "CPMK berhasil ditambahkan", description: "Item CPMK baru telah disimpan." });
    }
  };

  const updateCpmkItem = (id: number, title: string, description: string) => {
    setCpmkItems(cpmkItems.map(item => item.id === id ? { ...item, title, description } : item));
    setEditingCpmk(null);
    toast({ title: "CPMK berhasil diperbarui", description: "Perubahan telah disimpan." });
  };

  const deleteCpmkItem = (id: number) => {
    setCpmkItems(cpmkItems.filter(item => item.id !== id));
    toast({ title: "CPMK berhasil dihapus", description: "Item CPMK telah dihapus." });
  };

  // Course data
  const courseData: { [key: string]: { [key: string]: { name: string; sks: number; code: string } } } = {
    "semester-1": {
      "metodologi-penelitian-pelayanan-kesehatan": { name: "Metodologi Penelitian Pelayanan Kesehatan", sks: 3, code: "MRS101" },
      "manajemen-strategik-1": { name: "Manajemen Strategik 1", sks: 3, code: "MRS102" },
      "manajemen-keuangan-rs": { name: "Manajemen Keuangan RS", sks: 3, code: "MRS103" },
      "sistem-informasi-manajemen-rs": { name: "Sistem Informasi Manajemen RS", sks: 3, code: "MRS104" },
      "manajemen-sumber-daya-manusia-rs": { name: "Manajemen Sumber Daya Manusia RS", sks: 3, code: "MRS105" },
      "hukum-kesehatan": { name: "Hukum Kesehatan", sks: 2, code: "MRS106" }
    },
    "semester-2": {
      "manajemen-strategik-2": { name: "Manajemen Strategik 2", sks: 3, code: "MRS201" },
      "manajemen-pelayanan-medis": { name: "Manajemen Pelayanan Medis", sks: 3, code: "MRS202" },
      "manajemen-mutu-rs": { name: "Manajemen Mutu RS", sks: 3, code: "MRS203" },
      "manajemen-pemasaran-jasa-kesehatan": { name: "Manajemen Pemasaran Jasa Kesehatan", sks: 2, code: "MRS204" },
      "manajemen-pelayanan-khusus-rs": { name: "Manajemen Pelayanan Khusus RS", sks: 2, code: "MRS205" },
      "manajemen-strategik-rs": { name: "Manajemen Strategik RS", sks: 3, code: "MRS206" },
      "publikasi-ilmiah": { name: "Publikasi Ilmiah", sks: 6, code: "MRS207" }
    },
    "semester-3": {
      "blok-elektif": { name: "Blok Elektif", sks: 2, code: "MRS301" },
      "residensi": { name: "Residensi", sks: 3, code: "MRS302" },
      "tesis": { name: "Tesis", sks: 12, code: "MRS303" }
    }
  };

  const course = courseData[semester || ""]?.[courseSlug || ""];
  
  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Mata Kuliah Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Silakan pilih mata kuliah dari menu RPS.</p>
        </div>
      </Layout>
    );
  }

  const semesterName = semester?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Initialize course info when course data is available
  useEffect(() => {
    if (course) {
      setCourseInfo(prev => ({
        ...prev,
        namaMataKuliah: course.name,
        kodeMataKuliah: course.code,
        sksMataKuliah: course.sks,
        semesterMataKuliah: semesterName || ""
      }));
    }
  }, [course, semesterName]);

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <BookOpen className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {course.code}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {course.sks} SKS
                </Badge>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {course.name}
            </h1>
            <p className="text-white/90 text-lg">
              Rencana Pembelajaran Semester - {semesterName}
            </p>
          </div>
        </div>
      </section>

      {/* RPS Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 mb-8">
              <TabsTrigger value="deskripsi" className="text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <BookOpen className="h-4 w-4 mr-1" />
                Deskripsi
              </TabsTrigger>
              <TabsTrigger value="cpl" className="text-xs font-bold bg-green-100 text-green-800 hover:bg-green-200 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <Target className="h-4 w-4 mr-1" />
                CPL
              </TabsTrigger>
              <TabsTrigger value="cpmk" className="text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <ListChecks className="h-4 w-4 mr-1" />
                CPMK
              </TabsTrigger>
              <TabsTrigger value="subcpmk" className="text-xs font-bold bg-orange-100 text-orange-800 hover:bg-orange-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <GitBranch className="h-4 w-4 mr-1" />
                Sub-CPMK
              </TabsTrigger>
              <TabsTrigger value="rencana" className="text-xs font-bold bg-indigo-100 text-indigo-800 hover:bg-indigo-200 data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-1" />
                Rencana
              </TabsTrigger>
              <TabsTrigger value="penilaian" className="text-xs font-bold bg-red-100 text-red-800 hover:bg-red-200 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <CheckCircle className="h-4 w-4 mr-1" />
                Tugas/Ujian
              </TabsTrigger>
              <TabsTrigger value="evaluasi" className="text-xs font-bold bg-teal-100 text-teal-800 hover:bg-teal-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                <CheckCircle className="h-4 w-4 mr-1" />
                Evaluasi
              </TabsTrigger>
              <TabsTrigger value="bobot" className="text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4 mr-1" />
                Bobot
              </TabsTrigger>
              <TabsTrigger value="referensi" className="text-xs font-bold bg-cyan-100 text-cyan-800 hover:bg-cyan-200 data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <BookMarked className="h-4 w-4 mr-1" />
                Referensi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deskripsi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-bold text-blue-800">Deskripsi Mata Kuliah</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Course Information */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-4 text-primary">Informasi Mata Kuliah</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                          Nama Penanggung Jawab
                        </label>
                        <Input
                          value={courseInfo.penanggungJawab}
                          onChange={(e) => setCourseInfo({...courseInfo, penanggungJawab: e.target.value})}
                          placeholder="Masukkan nama penanggung jawab mata kuliah"
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                          Tahun Ajaran
                        </label>
                        <Input
                          value={courseInfo.tahunAjaran}
                          onChange={(e) => setCourseInfo({...courseInfo, tahunAjaran: e.target.value})}
                          placeholder="Contoh: 2024/2025"
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      <span className="font-bold text-green-800">Capaian Pembelajaran Lulusan (CPL)</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={selectAllCpl}>
                        Pilih Semua
                      </Button>
                      <Button size="sm" variant="outline" onClick={deselectAllCpl}>
                        Hapus Semua
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Pilih CPL yang Relevan untuk Mata Kuliah Ini:</h4>
                    <p className="text-sm text-muted-foreground">
                      Silakan pilih CPL dari Program Studi MARS yang sesuai dengan target pembelajaran mata kuliah ini.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {marsCompleteData.map((cpl) => (
                      <div key={cpl.id} className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        selectedCplIds.includes(cpl.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      } ${cpl.bgColor}`}>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedCplIds.includes(cpl.id)}
                            onChange={() => toggleCplSelection(cpl.id)}
                            className="mt-1 w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-800">
                                {cpl.code} - {cpl.title}
                              </h4>
                              <Badge variant="outline" className="text-xs font-medium">
                                Taksonomi: {cpl.bloomLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {cpl.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedCplIds.length > 0 && (
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        CPL Terpilih untuk Mata Kuliah Ini ({selectedCplIds.length} dari {marsCompleteData.length})
                      </h4>
                      <div className="space-y-2">
                        {cplItems.map((cpl) => (
                          <div key={cpl.id} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">{cpl.code}</span>
                            <span className="text-muted-foreground">-</span>
                            <span>{cpl.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpmk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5" />
                      <span className="font-bold text-purple-800">Capaian Pembelajaran Mata Kuliah (CPMK)</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={generateCpmkFromCpl}
                        disabled={selectedCplIds.length === 0}
                        className="gap-2"
                      >
                        <Target className="h-4 w-4" />
                        Generate dari CPL
                      </Button>
                      <Dialog open={newCpmkDialog} onOpenChange={setNewCpmkDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah Manual
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Tambah CPMK Baru</DialogTitle>
                            <DialogDescription>
                              Masukkan judul dan deskripsi untuk Capaian Pembelajaran Mata Kuliah baru.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Judul CPMK</label>
                              <Input
                                value={cpmkForm.title}
                                onChange={(e) => setCpmkForm(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Contoh: CPMK-4"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Deskripsi CPMK</label>
                              <Textarea
                                value={cpmkForm.description}
                                onChange={(e) => setCpmkForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Masukkan deskripsi lengkap CPMK..."
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setNewCpmkDialog(false)}>
                              Batal
                            </Button>
                            <Button onClick={addCpmkItem}>
                              <Save className="h-4 w-4 mr-2" />
                              Simpan
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedCplIds.length > 0 && (
                    <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        CPMK Otomatis dari CPL Terpilih
                      </h4>
                      <p className="text-sm text-purple-700">
                        CPMK di bawah ini telah digenerate otomatis berdasarkan {selectedCplIds.length} CPL yang Anda pilih. 
                        Klik "Generate dari CPL" untuk memperbarui jika ada perubahan CPL.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {Object.entries(getCpmkGroupedByCpl()).map(([cplCode, cpmkGroup]) => (
                      <div key={cplCode} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-purple-800">
                              {cplCode === 'Manual' ? 'CPMK Manual' : `CPMK dari ${cplCode}`}
                            </h5>
                            <Badge variant="outline" className="text-xs">
                              {cpmkGroup.length} CPMK
                            </Badge>
                          </div>
                          {cplCode !== 'Manual' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addCpmkForCpl(cplCode)}
                              className="gap-1 text-xs"
                            >
                              <Plus className="h-3 w-3" />
                              Tambah CPMK
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {cpmkGroup.map((item) => (
                            <div key={item.id} className={`p-4 border-l-4 ${item.borderColor} ${item.bgColor}`}>
                              {editingCpmk === item.id ? (
                                <div className="space-y-3">
                                  <Input
                                    defaultValue={item.title}
                                    onChange={(e) => item.title = e.target.value}
                                    className="font-semibold"
                                  />
                                  <Textarea
                                    defaultValue={item.description}
                                    onChange={(e) => item.description = e.target.value}
                                    rows={3}
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      onClick={() => updateCpmkItem(item.id, item.title, item.description)}
                                    >
                                      <Save className="h-4 w-4 mr-1" />
                                      Simpan
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => setEditingCpmk(null)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Batal
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold">{item.title}</h4>
                                      {item.relatedCpl && (
                                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-300">
                                          Dari {item.relatedCpl}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingCpmk(item.id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteCpmkItem(item.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground text-sm">{item.description}</p>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Placeholder for other tabs */}
            <TabsContent value="subcpmk">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Sub-CPMK content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rencana">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Rencana content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="penilaian">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Penilaian content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluasi">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Evaluasi content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bobot">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Bobot content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referensi">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Referensi content placeholder</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CourseRPS;
