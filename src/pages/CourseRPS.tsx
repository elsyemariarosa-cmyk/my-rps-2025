import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Target, ListChecks, GitBranch, Calendar, CheckCircle, BarChart3, BookMarked, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseRPS = () => {
  const { semester, courseSlug } = useParams();
  const { toast } = useToast();
  
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
  
  // Editing states
  const [editingCpl, setEditingCpl] = useState<number | null>(null);
  const [editingCpmk, setEditingCpmk] = useState<number | null>(null);
  const [editingSubCpmk, setEditingSubCpmk] = useState<number | null>(null);
  const [newCplDialog, setNewCplDialog] = useState(false);
  const [newCpmkDialog, setNewCpmkDialog] = useState(false);
  const [newSubCpmkDialog, setNewSubCpmkDialog] = useState(false);
  
  // Form states
  const [cplForm, setCplForm] = useState({ title: "", description: "" });
  const [cpmkForm, setCpmkForm] = useState({ title: "", description: "" });
  const [subCpmkForm, setSubCpmkForm] = useState({ code: "", description: "" });

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
      setSubCpmkItems([...subCpmkItems, { id: newId, code: subCpmkForm.code, description: subCpmkForm.description }]);
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
          </div>
        </div>
      </section>

      {/* RPS Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
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
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Deskripsi Singkat</h4>
                    <p className="text-muted-foreground">
                      Mata kuliah ini memberikan pemahaman komprehensif tentang konsep dan praktik dalam bidang {course.name.toLowerCase()}, 
                      dengan fokus pada pengembangan kompetensi yang sesuai dengan kebutuhan industri kesehatan modern.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Manfaat Mata Kuliah</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Mengembangkan pemahaman teoritis dan praktis</li>
                      <li>Meningkatkan kemampuan analisis dan problem solving</li>
                      <li>Mempersiapkan mahasiswa untuk dunia kerja profesional</li>
                    </ul>
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
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="secondary">Minggu {i + 1}</Badge>
                          <h4 className="font-semibold">Topik Pembelajaran {i + 1}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          Pembahasan mengenai aspek penting dari {course.name.toLowerCase()}.
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Metode:</span> Ceramah, Diskusi, Studi Kasus
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluasi">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Metode Evaluasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Penilaian Formatif</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                        <li>Kuis mingguan</li>
                        <li>Diskusi kelas</li>
                        <li>Tugas individu</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Penilaian Sumatif</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                        <li>Ujian Tengah Semester (UTS)</li>
                        <li>Ujian Akhir Semester (UAS)</li>
                        <li>Proyek akhir</li>
                      </ul>
                    </div>
                  </div>
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