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
import { BookOpen, Target, ListChecks, GitBranch, Calendar, CheckCircle, BarChart3, BookMarked, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  // State for editable content
  const [cplItems, setCplItems] = useState([
    { id: 1, title: "CPL-1: Sikap dan Tata Nilai", description: "Menunjukkan sikap bertakwa kepada Tuhan Yang Maha Esa dan mampu menunjukkan sikap religius, berjiwa Pancasila, dan berkepribadian Indonesia." },
    { id: 2, title: "CPL-2: Penguasaan Pengetahuan", description: "Menguasai konsep teoritis dan praktis dalam bidang manajemen dan administrasi rumah sakit." },
    { id: 3, title: "CPL-3: Keterampilan Khusus", description: "Mampu mengaplikasikan pengetahuan dan keterampilan dalam pengelolaan rumah sakit secara efektif." }
  ]);
  
  const [cpmkItems, setCpmkItems] = useState([
    { id: 1, title: "CPMK-1", description: "Mampu memahami dan menjelaskan konsep dasar mata kuliah ini.", borderColor: "border-primary", bgColor: "bg-primary/5" },
    { id: 2, title: "CPMK-2", description: "Mampu menganalisis permasalahan dan memberikan solusi yang tepat.", borderColor: "border-secondary", bgColor: "bg-secondary/5" },
    { id: 3, title: "CPMK-3", description: "Mampu mengimplementasikan konsep dalam situasi nyata.", borderColor: "border-accent", bgColor: "bg-accent/5" }
  ]);
  
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
  const [editingCpl, setEditingCpl] = useState<number | null>(null);
  const [editingCpmk, setEditingCpmk] = useState<number | null>(null);
  const [editingSubCpmk, setEditingSubCpmk] = useState<number | null>(null);
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [newCplDialog, setNewCplDialog] = useState(false);
  const [newCpmkDialog, setNewCpmkDialog] = useState(false);
  const [newSubCpmkDialog, setNewSubCpmkDialog] = useState(false);
  const [newActivityDialog, setNewActivityDialog] = useState(false);
  
  // Form states
  const [cplForm, setCplForm] = useState({ title: "", description: "" });
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

  // Helper functions
  const addCplItem = () => {
    if (cplForm.title && cplForm.description) {
      const newId = Math.max(...cplItems.map(item => item.id)) + 1;
      setCplItems([...cplItems, { id: newId, title: cplForm.title, description: cplForm.description }]);
      setCplForm({ title: "", description: "" });
      setNewCplDialog(false);
      toast({ title: "CPL berhasil ditambahkan", description: "Item CPL baru telah disimpan." });
    }
  };

  const updateCplItem = (id: number, title: string, description: string) => {
    setCplItems(cplItems.map(item => item.id === id ? { ...item, title, description } : item));
    setEditingCpl(null);
    toast({ title: "CPL berhasil diperbarui", description: "Perubahan telah disimpan." });
  };

  const deleteCplItem = (id: number) => {
    setCplItems(cplItems.filter(item => item.id !== id));
    toast({ title: "CPL berhasil dihapus", description: "Item CPL telah dihapus." });
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

  const addSubCpmkItem = () => {
    if (subCpmkForm.code && subCpmkForm.description) {
      const newId = Math.max(...subCpmkItems.map(item => item.id)) + 1;
      const newSubCpmk = { id: newId, code: subCpmkForm.code, description: subCpmkForm.description };
      setSubCpmkItems([...subCpmkItems, newSubCpmk]);
      setSubCpmkForm({ code: "", description: "" });
      setNewSubCpmkDialog(false);
      toast({ title: "Sub-CPMK berhasil ditambahkan", description: "Item Sub-CPMK baru telah disimpan." });
    }
  };

  const updateSubCpmkItem = (id: number, code: string, description: string) => {
    setSubCpmkItems(subCpmkItems.map(item => item.id === id ? { ...item, code, description } : item));
    setEditingSubCpmk(null);
    toast({ title: "Sub-CPMK berhasil diperbarui", description: "Perubahan telah disimpan." });
  };

  const deleteSubCpmkItem = (id: number) => {
    setSubCpmkItems(subCpmkItems.filter(item => item.id !== id));
    toast({ title: "Sub-CPMK berhasil dihapus", description: "Item Sub-CPMK telah dihapus." });
  };

  // Learning activities helper functions
  const addLearningActivity = () => {
    if (activityForm.subCpmk && activityForm.indicator) {
      const newId = Math.max(...learningActivities.map(item => item.id), 0) + 1;
      setLearningActivities([...learningActivities, { 
        id: newId, 
        ...activityForm 
      }]);
      setActivityForm({
        week: learningActivities.length + 2,
        subCpmk: "",
        indicator: "",
        assessmentCriteria: "",
        assessmentTechnique: "",
        offlineLearning: "",
        onlineLearning: "",
        learningMaterials: "",
        assessmentWeight: ""
      });
      setNewActivityDialog(false);
      toast({ title: "Kegiatan pembelajaran berhasil ditambahkan", description: "Item kegiatan pembelajaran baru telah disimpan." });
    }
  };

  const updateLearningActivity = (id: number, data: any) => {
    setLearningActivities(learningActivities.map(item => item.id === id ? { ...item, ...data } : item));
    setEditingActivity(null);
    toast({ title: "Kegiatan pembelajaran berhasil diperbarui", description: "Perubahan telah disimpan." });
  };

  const deleteLearningActivity = (id: number) => {
    setLearningActivities(learningActivities.filter(item => item.id !== id));
    toast({ title: "Kegiatan pembelajaran berhasil dihapus", description: "Item kegiatan pembelajaran telah dihapus." });
  };

  // Task/Exam assessment helper functions
  const addTaskExamItem = () => {
    if (taskExamForm.judulPenilaian && taskExamForm.deskripsiPenilaian && taskExamForm.bobotPenilaian > 0) {
      const newId = Math.max(...taskExamPlan.map(item => item.id), 0) + 1;
      setTaskExamPlan([...taskExamPlan, { 
        id: newId, 
        ...taskExamForm 
      }]);
      setTaskExamForm({
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
      setNewTaskExamDialog(false);
      toast({ title: "Rencana penilaian berhasil ditambahkan", description: "Item penilaian baru telah disimpan." });
    }
  };

  const updateTaskExamItem = (id: number, data: any) => {
    setTaskExamPlan(taskExamPlan.map(item => item.id === id ? { ...item, ...data } : item));
    setEditingTaskExam(null);
    toast({ title: "Rencana penilaian berhasil diperbarui", description: "Perubahan telah disimpan." });
  };

  const deleteTaskExamItem = (id: number) => {
    setTaskExamPlan(taskExamPlan.filter(item => item.id !== id));
    toast({ title: "Rencana penilaian berhasil dihapus", description: "Item penilaian telah dihapus." });
  };
  
  // Course data mapping
  const courseData: Record<string, Record<string, { name: string; sks: number; code: string }>> = {
    "semester-1": {
      "literasi-digital-akademik": { name: "Literasi Digital Akademik", sks: 1, code: "MRS101" },
      "manajemen-pelayanan-rs": { name: "Manajemen Pelayanan RS", sks: 4, code: "MRS102" },
      "pengantar-manajemen-keuangan": { name: "Pengantar Manajemen Keuangan", sks: 2, code: "MRS103" },
      "digitalisasi-rs": { name: "Digitalisasi RS", sks: 2, code: "MRS104" },
      "metodologi-penelitian-pelayanan-kesehatan": { name: "Metodologi Penelitian Pelayanan Kesehatan", sks: 4, code: "MRS105" },
      "manajemen-keuangan-rs": { name: "Manajemen Keuangan RS", sks: 2, code: "MRS106" }
    },
    "semester-2": {
      "manajemen-sdm-perilaku-kepemimpinan-rs": { name: "Manajemen SDM, Perilaku dan Kepemimpinan RS", sks: 3, code: "MRS201" },
      "manajemen-pencegahan-pengendalian-infeksi-rs": { name: "Manajemen Pencegahan dan Pengendalian Infeksi RS", sks: 2, code: "MRS202" },
      "pemberdayaan-masyarakat-kesehatan": { name: "Pemberdayaan Masyarakat Kesehatan", sks: 4, code: "MRS203" },
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
            <div className="flex items-center gap-3 mb-4">
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {course.name}
            </h1>
            <p className="text-white/90 text-lg">
              Rencana Pembelajaran Semester - {semesterName}
            </p>
            {(courseInfo.penanggungJawab || courseInfo.tahunAjaran !== "20../20..") && (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {courseInfo.penanggungJawab && (
                  <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="text-white/80">PJ: </span>
                    <span className="text-white font-medium">{courseInfo.penanggungJawab}</span>
                  </div>
                )}
                {courseInfo.tahunAjaran !== "20../20.." && (
                  <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="text-white/80">TA: </span>
                    <span className="text-white font-medium">{courseInfo.tahunAjaran}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RPS Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 mb-8">
              <TabsTrigger value="deskripsi" className="text-xs">
                <BookOpen className="h-4 w-4 mr-1" />
                Deskripsi
              </TabsTrigger>
              <TabsTrigger value="cpl" className="text-xs">
                <Target className="h-4 w-4 mr-1" />
                CPL
              </TabsTrigger>
              <TabsTrigger value="cpmk" className="text-xs">
                <ListChecks className="h-4 w-4 mr-1" />
                CPMK
              </TabsTrigger>
              <TabsTrigger value="subcpmk" className="text-xs">
                <GitBranch className="h-4 w-4 mr-1" />
                Sub-CPMK
              </TabsTrigger>
              <TabsTrigger value="rencana" className="text-xs">
                <Calendar className="h-4 w-4 mr-1" />
                Rencana
              </TabsTrigger>
              <TabsTrigger value="penilaian" className="text-xs">
                <CheckCircle className="h-4 w-4 mr-1" />
                Tugas/Ujian
              </TabsTrigger>
              <TabsTrigger value="evaluasi" className="text-xs">
                <CheckCircle className="h-4 w-4 mr-1" />
                Evaluasi
              </TabsTrigger>
              <TabsTrigger value="bobot" className="text-xs">
                <BarChart3 className="h-4 w-4 mr-1" />
                Bobot
              </TabsTrigger>
              <TabsTrigger value="referensi" className="text-xs">
                <BookMarked className="h-4 w-4 mr-1" />
                Referensi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deskripsi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Deskripsi Mata Kuliah
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
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Deskripsi Singkat</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (editingDescription) {
                            setCourseInfo({...courseInfo, deskripsiSingkat: tempDescription});
                            setEditingDescription(false);
                            toast({ title: "Deskripsi berhasil diperbarui", description: "Perubahan telah disimpan." });
                          } else {
                            setTempDescription(courseInfo.deskripsiSingkat || `Mata kuliah ini memberikan pemahaman komprehensif tentang konsep dan praktik dalam bidang ${course.name.toLowerCase()}, dengan fokus pada pengembangan kompetensi yang sesuai dengan kebutuhan industri kesehatan modern.`);
                            setEditingDescription(true);
                          }
                        }}
                      >
                        {editingDescription ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                    {editingDescription ? (
                      <div className="space-y-2">
                        <Textarea
                          value={tempDescription}
                          onChange={(e) => setTempDescription(e.target.value)}
                          rows={4}
                          className="bg-white"
                          placeholder="Masukkan deskripsi singkat mata kuliah..."
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setCourseInfo({...courseInfo, deskripsiSingkat: tempDescription});
                              setEditingDescription(false);
                              toast({ title: "Deskripsi berhasil diperbarui", description: "Perubahan telah disimpan." });
                            }}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Simpan
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingDescription(false)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Batal
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        {courseInfo.deskripsiSingkat || `Mata kuliah ini memberikan pemahaman komprehensif tentang konsep dan praktik dalam bidang ${course.name.toLowerCase()}, dengan fokus pada pengembangan kompetensi yang sesuai dengan kebutuhan industri kesehatan modern.`}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Manfaat Mata Kuliah</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (editingBenefits) {
                            const benefitsArray = tempBenefits.split('\n').filter(item => item.trim());
                            setCourseInfo({...courseInfo, manfaatMataKuliah: benefitsArray});
                            setEditingBenefits(false);
                            toast({ title: "Manfaat mata kuliah berhasil diperbarui", description: "Perubahan telah disimpan." });
                          } else {
                            const currentBenefits = courseInfo.manfaatMataKuliah.length > 0 
                              ? courseInfo.manfaatMataKuliah.join('\n')
                              : "Mengembangkan pemahaman teoritis dan praktis\nMeningkatkan kemampuan analisis dan problem solving\nMempersiapkan mahasiswa untuk dunia kerja profesional";
                            setTempBenefits(currentBenefits);
                            setEditingBenefits(true);
                          }
                        }}
                      >
                        {editingBenefits ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                    {editingBenefits ? (
                      <div className="space-y-2">
                        <Textarea
                          value={tempBenefits}
                          onChange={(e) => setTempBenefits(e.target.value)}
                          rows={6}
                          className="bg-white"
                          placeholder="Masukkan manfaat mata kuliah (satu per baris)..."
                        />
                        <p className="text-xs text-muted-foreground">
                          Tip: Tulis satu manfaat per baris untuk membuat daftar
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              const benefitsArray = tempBenefits.split('\n').filter(item => item.trim());
                              setCourseInfo({...courseInfo, manfaatMataKuliah: benefitsArray});
                              setEditingBenefits(false);
                              toast({ title: "Manfaat mata kuliah berhasil diperbarui", description: "Perubahan telah disimpan." });
                            }}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Simpan
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingBenefits(false)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Batal
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {(courseInfo.manfaatMataKuliah.length > 0 ? courseInfo.manfaatMataKuliah : [
                          "Mengembangkan pemahaman teoritis dan praktis",
                          "Meningkatkan kemampuan analisis dan problem solving", 
                          "Mempersiapkan mahasiswa untuk dunia kerja profesional"
                        ]).map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    )}
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
                      Capaian Pembelajaran Lulusan (CPL)
                    </div>
                    <Dialog open={newCplDialog} onOpenChange={setNewCplDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Tambah CPL
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tambah CPL Baru</DialogTitle>
                          <DialogDescription>
                            Masukkan judul dan deskripsi untuk Capaian Pembelajaran Lulusan baru.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Judul CPL</label>
                            <Input
                              value={cplForm.title}
                              onChange={(e) => setCplForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Contoh: CPL-4: Kemampuan Komunikasi"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Deskripsi CPL</label>
                            <Textarea
                              value={cplForm.description}
                              onChange={(e) => setCplForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Masukkan deskripsi lengkap CPL..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewCplDialog(false)}>
                            Batal
                          </Button>
                          <Button onClick={addCplItem}>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cplItems.map((item) => (
                      <div key={item.id} className="p-4 bg-muted/50 rounded-lg">
                        {editingCpl === item.id ? (
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
                                onClick={() => updateCplItem(item.id, item.title, item.description)}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Simpan
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingCpl(null)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold">{item.title}</h4>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingCpl(item.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteCplItem(item.id)}
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cpmk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5" />
                      Capaian Pembelajaran Mata Kuliah (CPMK)
                    </div>
                    <Dialog open={newCpmkDialog} onOpenChange={setNewCpmkDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Tambah CPMK
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
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cpmkItems.map((item) => (
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
                              <h4 className="font-semibold">{item.title}</h4>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subcpmk">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5" />
                      Sub-Capaian Pembelajaran Mata Kuliah
                    </div>
                    <Dialog open={newSubCpmkDialog} onOpenChange={setNewSubCpmkDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Tambah Sub-CPMK
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tambah Sub-CPMK Baru</DialogTitle>
                          <DialogDescription>
                            Masukkan kode dan deskripsi untuk Sub-Capaian Pembelajaran Mata Kuliah baru.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Kode Sub-CPMK</label>
                            <Input
                              value={subCpmkForm.code}
                              onChange={(e) => setSubCpmkForm(prev => ({ ...prev, code: e.target.value }))}
                              placeholder="Contoh: Sub-CPMK-6"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Deskripsi Sub-CPMK</label>
                            <Textarea
                              value={subCpmkForm.description}
                              onChange={(e) => setSubCpmkForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Masukkan deskripsi lengkap Sub-CPMK..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewSubCpmkDialog(false)}>
                            Batal
                          </Button>
                          <Button onClick={addSubCpmkItem}>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subCpmkItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        {editingSubCpmk === item.id ? (
                          <div className="flex-1 space-y-3">
                            <Input
                              defaultValue={item.code}
                              onChange={(e) => item.code = e.target.value}
                              className="font-medium"
                            />
                            <Textarea
                              defaultValue={item.description}
                              onChange={(e) => item.description = e.target.value}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => updateSubCpmkItem(item.id, item.code, item.description)}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Simpan
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingSubCpmk(null)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Badge variant="outline" className="mt-0.5">{item.code}</Badge>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingSubCpmk(item.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteSubCpmkItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rencana">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Rencana Kegiatan Pembelajaran
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Kegiatan pembelajaran otomatis dibuat berdasarkan Sub-CPMK yang telah didefinisikan. 
                    Silakan lengkapi detail untuk setiap kegiatan.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16 text-center">Minggu ke (1)</TableHead>
                          <TableHead className="min-w-40">Kemampuan akhir tiap tahapan belajar (Sub-CPMK) (2)</TableHead>
                          <TableHead className="min-w-40">Indikator (3)</TableHead>
                          <TableHead className="min-w-40">Penilaian Kriteria & Teknik (4)</TableHead>
                          <TableHead className="min-w-40">Bentuk/Strategi Pembelajaran [Estimasi Waktu] Luring (5)</TableHead>
                          <TableHead className="min-w-40">Daring (6)</TableHead>
                          <TableHead className="min-w-40">Materi Pembelajaran [Pustaka] (7)</TableHead>
                          <TableHead className="w-20 text-center">Bobot Penilaian (%) (8)</TableHead>
                          <TableHead className="w-20">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {learningActivities.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="text-center font-medium">
                              {activity.week}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <Badge variant="secondary" className="mb-1">{activity.subCpmk}</Badge>
                                <div className="text-xs text-muted-foreground">
                                  {activity.subCpmkDescription}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <Textarea
                                  defaultValue={activity.indicator}
                                  onChange={(e) => activity.indicator = e.target.value}
                                  rows={3}
                                  placeholder="Masukkan indikator pembelajaran..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {activity.indicator || <span className="text-muted-foreground italic">Klik edit untuk menambahkan indikator</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <div className="space-y-2">
                                  <Textarea
                                    defaultValue={activity.assessmentCriteria}
                                    onChange={(e) => activity.assessmentCriteria = e.target.value}
                                    placeholder="Kriteria penilaian..."
                                    rows={2}
                                  />
                                  <Textarea
                                    defaultValue={activity.assessmentTechnique}
                                    onChange={(e) => activity.assessmentTechnique = e.target.value}
                                    placeholder="Teknik penilaian..."
                                    rows={2}
                                  />
                                </div>
                              ) : (
                                <div className="text-sm space-y-2">
                                  {activity.assessmentCriteria ? (
                                    <div><strong>Kriteria:</strong> {activity.assessmentCriteria}</div>
                                  ) : (
                                    <div className="text-muted-foreground italic">Klik edit untuk menambahkan kriteria</div>
                                  )}
                                  {activity.assessmentTechnique ? (
                                    <div><strong>Teknik:</strong> {activity.assessmentTechnique}</div>
                                  ) : (
                                    <div className="text-muted-foreground italic">Klik edit untuk menambahkan teknik</div>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <Textarea
                                  defaultValue={activity.offlineLearning}
                                  onChange={(e) => activity.offlineLearning = e.target.value}
                                  rows={3}
                                  placeholder="Strategi pembelajaran luring..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {activity.offlineLearning || <span className="text-muted-foreground italic">Klik edit untuk menambahkan strategi luring</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <Textarea
                                  defaultValue={activity.onlineLearning}
                                  onChange={(e) => activity.onlineLearning = e.target.value}
                                  rows={3}
                                  placeholder="Strategi pembelajaran daring..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {activity.onlineLearning || <span className="text-muted-foreground italic">Klik edit untuk menambahkan strategi daring</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <Textarea
                                  defaultValue={activity.learningMaterials}
                                  onChange={(e) => activity.learningMaterials = e.target.value}
                                  rows={3}
                                  placeholder="Materi dan pustaka..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {activity.learningMaterials || <span className="text-muted-foreground italic">Klik edit untuk menambahkan materi</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingActivity === activity.id ? (
                                <Input
                                  defaultValue={activity.assessmentWeight}
                                  onChange={(e) => activity.assessmentWeight = e.target.value}
                                  className="w-16 text-center"
                                  placeholder="20%"
                                />
                              ) : (
                                activity.assessmentWeight ? (
                                  <Badge variant="outline">{activity.assessmentWeight}</Badge>
                                ) : (
                                  <span className="text-muted-foreground italic text-xs">Edit</span>
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              {editingActivity === activity.id ? (
                                <div className="flex flex-col gap-1">
                                  <Button
                                    size="sm"
                                    onClick={() => updateLearningActivity(activity.id, activity)}
                                  >
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingActivity(null)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingActivity(activity.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {learningActivities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Belum ada kegiatan pembelajaran.</p>
                      <p className="text-sm">Tambahkan Sub-CPMK terlebih dahulu untuk membuat kegiatan pembelajaran otomatis.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="penilaian">
              <Card>
                <CardHeader>
                  <div className="text-center space-y-2 border-b pb-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        UMY
                      </div>
                      <div className="text-center">
                        <h2 className="text-xl font-bold">UNIVERSITAS MUHAMMADIYAH YOGYAKARTA</h2>
                        <p className="text-sm">Fakultas Kedokteran dan Ilmu Kesehatan</p>
                        <p className="text-sm">Prodi Magister Administrasi Rumah Sakit</p>
                        <h3 className="text-lg font-bold mt-2 bg-green-700 text-white px-4 py-1 rounded">
                          RENCANA PENILAIAN TUGAS/UJIAN
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Dialog open={newTaskExamDialog} onOpenChange={setNewTaskExamDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Tambah Penilaian
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Tambah Rencana Penilaian</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Judul Penilaian</label>
                              <Input
                                placeholder="Contoh: UCPMK1: Kuis MyKlass"
                                value={taskExamForm.judulPenilaian}
                                onChange={(e) => setTaskExamForm({...taskExamForm, judulPenilaian: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Bobot (%)</label>
                              <Input
                                type="number"
                                value={taskExamForm.bobotPenilaian}
                                onChange={(e) => setTaskExamForm({...taskExamForm, bobotPenilaian: parseInt(e.target.value) || 0})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Bentuk Penilaian</label>
                            <Textarea
                              placeholder="Ujian online berupa Kuis MyKlass"
                              value={taskExamForm.bentukPenilaian}
                              onChange={(e) => setTaskExamForm({...taskExamForm, bentukPenilaian: e.target.value})}
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Deskripsi Penilaian</label>
                            <Textarea
                              value={taskExamForm.deskripsiPenilaian}
                              onChange={(e) => setTaskExamForm({...taskExamForm, deskripsiPenilaian: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Metode Penilaian</label>
                            <Textarea
                              value={taskExamForm.metodePenilaian}
                              onChange={(e) => setTaskExamForm({...taskExamForm, metodePenilaian: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Bentuk dan Format Luaran</label>
                            <Textarea
                              value={taskExamForm.bentukFormatLuaran}
                              onChange={(e) => setTaskExamForm({...taskExamForm, bentukFormatLuaran: e.target.value})}
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Indikator & Kriteria</label>
                              <Input
                                value={taskExamForm.indikatorKriteria}
                                onChange={(e) => setTaskExamForm({...taskExamForm, indikatorKriteria: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Jadwal Pelaksanaan</label>
                              <Input
                                value={taskExamForm.jadwalPelaksanaan}
                                onChange={(e) => setTaskExamForm({...taskExamForm, jadwalPelaksanaan: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Pustaka</label>
                            <Textarea
                              value={taskExamForm.pustaka}
                              onChange={(e) => setTaskExamForm({...taskExamForm, pustaka: e.target.value})}
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Lain-lain</label>
                            <Textarea
                              value={taskExamForm.lainLain}
                              onChange={(e) => setTaskExamForm({...taskExamForm, lainLain: e.target.value})}
                              rows={2}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNewTaskExamDialog(false)}>
                            Batal
                          </Button>
                          <Button onClick={addTaskExamItem}>Simpan</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {taskExamPlan.map((item, index) => (
                    <div key={item.id} className="mb-8 border rounded-lg">
                      {/* Header Info Table */}
                      <div className="border-b bg-muted/30">
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 w-48">MATA KULIAH</td>
                              <td className="p-3">
                                {editingCourseHeader ? (
                                  <Input
                                    value={courseInfo.namaMataKuliah}
                                    onChange={(e) => setCourseInfo({...courseInfo, namaMataKuliah: e.target.value})}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingCourseHeader(true)}>
                                    {courseInfo.namaMataKuliah || "Klik untuk mengisi..."}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 font-semibold bg-gray-100 w-20">SKS</td>
                              <td className="p-3">
                                {editingCourseHeader ? (
                                  <Input
                                    type="number"
                                    value={courseInfo.sksMataKuliah}
                                    onChange={(e) => setCourseInfo({...courseInfo, sksMataKuliah: parseInt(e.target.value) || 0})}
                                    className="text-sm w-16"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingCourseHeader(true)}>
                                    {courseInfo.sksMataKuliah || "..."}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 font-semibold bg-gray-100 w-24">SEMESTER</td>
                              <td className="p-3">
                                {editingCourseHeader ? (
                                  <Input
                                    value={courseInfo.semesterMataKuliah}
                                    onChange={(e) => setCourseInfo({...courseInfo, semesterMataKuliah: e.target.value})}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingCourseHeader(true)}>
                                    {courseInfo.semesterMataKuliah || "..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100">KODE</td>
                              <td className="p-3" colSpan={5}>
                                {editingCourseHeader ? (
                                  <Input
                                    value={courseInfo.kodeMataKuliah}
                                    onChange={(e) => setCourseInfo({...courseInfo, kodeMataKuliah: e.target.value})}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingCourseHeader(true)}>
                                    {courseInfo.kodeMataKuliah || "Klik untuk mengisi..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold bg-gray-100">DOSEN PENGAMPU</td>
                              <td className="p-3" colSpan={5}>
                                {editingCourseHeader ? (
                                  <div className="space-y-2">
                                    {courseInfo.dosenPengampu.map((dosen, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <span className="w-4">{idx + 1}.</span>
                                        <Input
                                          value={dosen}
                                          onChange={(e) => {
                                            const newDosen = [...courseInfo.dosenPengampu];
                                            newDosen[idx] = e.target.value;
                                            setCourseInfo({...courseInfo, dosenPengampu: newDosen});
                                          }}
                                          placeholder={`Nama dosen ${idx + 1}`}
                                          className="text-sm"
                                        />
                                      </div>
                                    ))}
                                    <div className="flex gap-2 mt-3">
                                      <Button size="sm" onClick={() => setEditingCourseHeader(false)}>
                                        <Save className="h-3 w-3 mr-1" />
                                        Simpan
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => setEditingCourseHeader(false)}>
                                        <X className="h-3 w-3 mr-1" />
                                        Batal
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingCourseHeader(true)}>
                                    {courseInfo.dosenPengampu.map((dosen, idx) => (
                                      <div key={idx}>
                                        {idx + 1}. {dosen || "Klik untuk mengisi..."}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Assessment Details Table */}
                      <div>
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 w-48 align-top">BENTUK PENILAIAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.bentukPenilaian}
                                    onChange={(e) => item.bentukPenilaian = e.target.value}
                                    rows={2}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded block" onClick={() => setEditingTaskExam(item.id)}>
                                    {item.bentukPenilaian || "Klik untuk mengisi..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">JUDUL PENILAIAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Input
                                    defaultValue={item.judulPenilaian}
                                    onChange={(e) => item.judulPenilaian = e.target.value}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded block" onClick={() => setEditingTaskExam(item.id)}>
                                    {item.judulPenilaian || "Klik untuk mengisi..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">SUB-CPMK</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <div className="flex flex-wrap gap-2">
                                    {subCpmkItems.map((subCpmk) => (
                                      <div key={subCpmk.id} className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          id={`edit-subcpmk-${item.id}-${subCpmk.id}`}
                                          checked={item.subCpmk.includes(subCpmk.code)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              item.subCpmk = [...item.subCpmk, subCpmk.code];
                                            } else {
                                              item.subCpmk = item.subCpmk.filter((code: string) => code !== subCpmk.code);
                                            }
                                          }}
                                        />
                                        <label htmlFor={`edit-subcpmk-${item.id}-${subCpmk.id}`} className="text-sm">
                                          {subCpmk.code}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    {item.subCpmk.length > 0 ? item.subCpmk.map((subcpmk: string, idx: number) => (
                                      <div key={idx}>{subcpmk}{idx < item.subCpmk.length - 1 ? ',' : ''}</div>
                                    )) : "Klik untuk memilih Sub-CPMK..."}
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">DESKRIPSI PENILAIAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.deskripsiPenilaian}
                                    onChange={(e) => item.deskripsiPenilaian = e.target.value}
                                    rows={3}
                                    className="text-sm"
                                  />
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    Contoh:<br/>
                                    <u>{item.judulPenilaian.split(':')[0]}</u> {item.deskripsiPenilaian || "Klik untuk mengisi deskripsi..."}
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">METODE PENILAIAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.metodePenilaian}
                                    onChange={(e) => item.metodePenilaian = e.target.value}
                                    rows={3}
                                    className="text-sm"
                                  />
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    Contoh:<br/>
                                    <div className="ml-4">
                                      1. {item.metodePenilaian.split('.')[0] || item.metodePenilaian || "Klik untuk mengisi metode..."}<br/>
                                      2. waktu pengerjaan 60 menit<br/>
                                      3. Nilai langsung keluar setelah selesai mengerjakan
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">BENTUK DAN FORMAT LUARAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.bentukFormatLuaran}
                                    onChange={(e) => item.bentukFormatLuaran = e.target.value}
                                    rows={2}
                                    className="text-sm"
                                  />
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    Contoh:<br/>
                                    {item.bentukFormatLuaran || "Klik untuk mengisi format luaran..."}
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">INDIKATOR, KRITERIA, DAN BOBOT PENILAIAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <div className="space-y-2">
                                    <Input
                                      defaultValue={item.indikatorKriteria}
                                      onChange={(e) => item.indikatorKriteria = e.target.value}
                                      placeholder="Indikator dan kriteria"
                                      className="text-sm"
                                    />
                                    <Input
                                      type="number"
                                      defaultValue={item.bobotPenilaian}
                                      onChange={(e) => item.bobotPenilaian = parseInt(e.target.value) || 0}
                                      placeholder="Bobot penilaian (%)"
                                      className="text-sm w-32"
                                    />
                                  </div>
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    Contoh:<br/>
                                    Indikator: {item.indikatorKriteria || "Klik untuk mengisi..."} ({item.bobotPenilaian}%)
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">JADWAL PELAKSANAAN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Input
                                    defaultValue={item.jadwalPelaksanaan}
                                    onChange={(e) => item.jadwalPelaksanaan = e.target.value}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded block" onClick={() => setEditingTaskExam(item.id)}>
                                    {item.jadwalPelaksanaan || "Klik untuk mengisi jadwal..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-3 font-semibold bg-gray-100 align-top">PUSTAKA</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.pustaka}
                                    onChange={(e) => item.pustaka = e.target.value}
                                    rows={3}
                                    className="text-sm"
                                  />
                                ) : (
                                  <div className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded" onClick={() => setEditingTaskExam(item.id)}>
                                    Contoh:<br/>
                                    <div className="ml-4">
                                      - {item.pustaka.split(',')[0] || item.pustaka || "Klik untuk mengisi pustaka..."}<br/>
                                      - buku....<br/>
                                      - video...<br/>
                                      - dll
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold bg-gray-100 align-top">LAIN - LAIN</td>
                              <td className="p-3">
                                {editingTaskExam === item.id ? (
                                  <Textarea
                                    defaultValue={item.lainLain}
                                    onChange={(e) => item.lainLain = e.target.value}
                                    rows={2}
                                    className="text-sm"
                                  />
                                ) : (
                                  <span className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded block" onClick={() => setEditingTaskExam(item.id)}>
                                    {item.lainLain || "Klik untuk mengisi catatan tambahan..."}
                                  </span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-3 bg-muted/10 flex justify-end gap-2">
                        {editingTaskExam === item.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                updateTaskExamItem(item.id, item);
                                setEditingTaskExam(null);
                              }}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Simpan
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTaskExam(null)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Batal
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingTaskExam(item.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteTaskExamItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {taskExamPlan.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Belum ada rencana penilaian tugas/ujian.</p>
                      <p className="text-sm">Klik "Tambah Penilaian" untuk membuat rencana baru.</p>
                    </div>
                  )}

                  {/* Summary */}
                  {taskExamPlan.length > 0 && (
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">Total Bobot Penilaian</h4>
                        <Badge 
                          variant={taskExamPlan.reduce((sum, item) => sum + item.bobotPenilaian, 0) === 100 ? "default" : "destructive"}
                          className="text-lg px-4 py-2"
                        >
                          {taskExamPlan.reduce((sum, item) => sum + item.bobotPenilaian, 0)}%
                        </Badge>
                      </div>
                      {taskExamPlan.reduce((sum, item) => sum + item.bobotPenilaian, 0) !== 100 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          ⚠️ Total bobot penilaian harus 100%
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluasi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Rencana Penilaian dan Evaluasi
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Rencana penilaian otomatis dibuat berdasarkan CPL, CPMK, dan Sub-CPMK yang telah didefinisikan. 
                    Silakan lengkapi detail penilaian untuk setiap komponen.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-primary/10">
                          <TableHead className="text-center font-bold text-white bg-primary">Minggu ke-</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">CPL</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">CPMK</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Sub-CPMK</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Bobot Sub-CPMK</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Indikator</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Bentuk Penilaian</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Bobot CPMK (%)</TableHead>
                          <TableHead className="text-center font-bold text-white bg-primary">Aksi</TableHead>
                        </TableRow>
                        <TableRow className="text-center text-sm bg-muted/30">
                          <TableHead className="text-center">a</TableHead>
                          <TableHead className="text-center">b</TableHead>
                          <TableHead className="text-center">c</TableHead>
                          <TableHead className="text-center">d</TableHead>
                          <TableHead className="text-center">e</TableHead>
                          <TableHead className="text-center">f</TableHead>
                          <TableHead className="text-center">g</TableHead>
                          <TableHead className="text-center">h</TableHead>
                          <TableHead className="text-center">i</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assessmentPlan.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="text-center">
                              {editingAssessment === plan.id ? (
                                <Input
                                  defaultValue={plan.week}
                                  onChange={(e) => plan.week = e.target.value}
                                  className="w-20 text-center"
                                  placeholder="4"
                                />
                              ) : (
                                <div className="text-sm">
                                  {plan.week || <span className="text-muted-foreground italic">Edit</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingAssessment === plan.id ? (
                                <Select 
                                  defaultValue={plan.cpl}
                                  onValueChange={(value) => plan.cpl = value}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-popover border z-50">
                                    {cplItems.map((cpl) => (
                                      <SelectItem key={cpl.id} value={cpl.title}>
                                        {cpl.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant="secondary">{plan.cpl}</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{plan.cpmk}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {plan.subCpmkList.map((subCpmk: any) => (
                                  <div key={subCpmk.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                                    <Badge variant="outline" className="text-xs">{subCpmk.code}</Badge>
                                    {editingAssessment === plan.id ? (
                                      <Input
                                        defaultValue={plan.subCpmkWeights[subCpmk.code]}
                                        onChange={(e) => plan.subCpmkWeights[subCpmk.code] = e.target.value}
                                        className="w-16 text-center ml-2"
                                        placeholder="5%"
                                      />
                                    ) : (
                                      <span className="text-xs text-muted-foreground ml-2">
                                        {plan.subCpmkWeights[subCpmk.code] || "-%"}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="text-sm font-medium">
                                {plan.subCpmkList.reduce((total: number, sub: any) => {
                                  const weight = parseInt(plan.subCpmkWeights[sub.code]?.replace('%', '') || '0');
                                  return total + weight;
                                }, 0)}%
                              </div>
                            </TableCell>
                            <TableCell>
                              {editingAssessment === plan.id ? (
                                <Textarea
                                  defaultValue={plan.indicator}
                                  onChange={(e) => plan.indicator = e.target.value}
                                  rows={3}
                                  placeholder="Mengidentifikasi nilai dan hasil..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {plan.indicator || <span className="text-muted-foreground italic">Klik edit untuk menambahkan indikator</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingAssessment === plan.id ? (
                                <Textarea
                                  defaultValue={plan.assessmentForm}
                                  onChange={(e) => plan.assessmentForm = e.target.value}
                                  rows={3}
                                  placeholder="Kuis myklass, Ujian tertulis..."
                                />
                              ) : (
                                <div className="text-sm">
                                  {plan.assessmentForm || <span className="text-muted-foreground italic">Klik edit untuk menambahkan bentuk penilaian</span>}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingAssessment === plan.id ? (
                                <Input
                                  defaultValue={plan.cpmkWeight}
                                  onChange={(e) => plan.cpmkWeight = e.target.value}
                                  className="w-16 text-center"
                                  placeholder="20%"
                                />
                              ) : (
                                plan.cpmkWeight ? (
                                  <Badge variant="secondary" className="font-bold">{plan.cpmkWeight}</Badge>
                                ) : (
                                  <span className="text-muted-foreground italic text-xs">Edit</span>
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              {editingAssessment === plan.id ? (
                                <div className="flex flex-col gap-1">
                                  <Button
                                    size="sm"
                                    onClick={() => updateAssessmentPlan(plan.id, plan)}
                                  >
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingAssessment(null)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingAssessment(plan.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Total Row */}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center">100%</TableCell>
                          <TableCell className="text-center">-</TableCell>
                          <TableCell className="text-center font-bold">Jumlah</TableCell>
                          <TableCell className="text-center font-bold">100</TableCell>
                          <TableCell className="text-center">-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  {assessmentPlan.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Belum ada rencana penilaian.</p>
                      <p className="text-sm">Tambahkan CPMK dan Sub-CPMK terlebih dahulu untuk membuat rencana penilaian otomatis.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bobot">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Bobot Penilaian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary mb-1">20%</div>
                        <div className="text-sm text-muted-foreground">Tugas & Kuis</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-secondary mb-1">25%</div>
                        <div className="text-sm text-muted-foreground">Partisipasi</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-accent mb-1">25%</div>
                        <div className="text-sm text-muted-foreground">UTS</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary mb-1">30%</div>
                        <div className="text-sm text-muted-foreground">UAS</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Kriteria Penilaian</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>A: 85-100 (Sangat Baik)</div>
                        <div>B: 70-84 (Baik)</div>
                        <div>C: 55-69 (Cukup)</div>
                        <div>D: 40-54 (Kurang)</div>
                        <div>E: 0-39 (Sangat Kurang)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referensi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5" />
                    Referensi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Referensi Utama</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Buku Referensi 1</p>
                          <p className="text-xs text-muted-foreground">Penulis, Tahun, Penerbit</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Buku Referensi 2</p>
                          <p className="text-xs text-muted-foreground">Penulis, Tahun, Penerbit</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Referensi Pendukung</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Jurnal Ilmiah Terkait</p>
                          <p className="text-xs text-muted-foreground">Journal Name, Volume, Issue</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Artikel Online</p>
                          <p className="text-xs text-muted-foreground">Website, Tanggal Akses</p>
                        </div>
                      </div>
                    </div>
                  </div>
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