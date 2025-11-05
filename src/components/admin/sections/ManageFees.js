import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  DollarSign,
  Plus,
  Search,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  ArrowLeft,
} from "lucide-react";

export default function ManageFees({ onSectionChange }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [feeStructure, setFeeStructure] = useState([
    {
      id: 1,
      course: "B.Tech",
      semester: "1",
      tuitionFee: 45000,
      examFee: 2000,
      libraryFee: 1000,
      otherFees: 2000,
      total: 50000,
    },
    {
      id: 2,
      course: "B.Tech",
      semester: "2",
      tuitionFee: 45000,
      examFee: 2000,
      libraryFee: 1000,
      otherFees: 2000,
      total: 50000,
    },
    {
      id: 3,
      course: "M.Tech",
      semester: "1",
      tuitionFee: 60000,
      examFee: 3000,
      libraryFee: 1500,
      otherFees: 2500,
      total: 67000,
    },
  ]);

  const [studentPayments, setStudentPayments] = useState([
    {
      id: 1,
      studentId: "STU2021001",
      studentName: "Arjun Sharma",
      course: "B.Tech",
      semester: "6",
      totalFee: 50000,
      paidAmount: 50000,
      pendingAmount: 0,
      status: "Paid",
      lastPaymentDate: "2025-09-15",
    },
    {
      id: 2,
      studentId: "STU2021002",
      studentName: "Priya Patel",
      course: "B.Tech",
      semester: "4",
      totalFee: 50000,
      paidAmount: 30000,
      pendingAmount: 20000,
      status: "Partial",
      lastPaymentDate: "2025-09-10",
    },
    {
      id: 3,
      studentId: "STU2021003",
      studentName: "Rahul Kumar",
      course: "B.Tech",
      semester: "6",
      totalFee: 50000,
      paidAmount: 0,
      pendingAmount: 50000,
      status: "Pending",
      lastPaymentDate: "-",
    },
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      studentId: "STU2021001",
      studentName: "Arjun Sharma",
      amount: 50000,
      paymentMethod: "Bank Transfer",
      transactionId: "TXN2025001",
      date: "2025-09-15",
      status: "Success",
    },
    {
      id: 2,
      studentId: "STU2021002",
      studentName: "Priya Patel",
      amount: 30000,
      paymentMethod: "Online",
      transactionId: "TXN2025002",
      date: "2025-09-10",
      status: "Success",
    },
  ]);

  const [newFeeStructure, setNewFeeStructure] = useState({
    course: "",
    semester: "",
    tuitionFee: "",
    examFee: "",
    libraryFee: "",
    otherFees: "",
  });

  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentMethod: "",
    transactionId: "",
    remarks: "",
  });

  const filteredPayments = studentPayments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalCollected: studentPayments.reduce((sum, p) => sum + p.paidAmount, 0),
    totalPending: studentPayments.reduce((sum, p) => sum + p.pendingAmount, 0),
    totalStudents: studentPayments.length,
    paidStudents: studentPayments.filter((p) => p.status === "Paid").length,
  };

  const handleAddFeeStructure = () => {
    const total =
      parseInt(newFeeStructure.tuitionFee || 0) +
      parseInt(newFeeStructure.examFee || 0) +
      parseInt(newFeeStructure.libraryFee || 0) +
      parseInt(newFeeStructure.otherFees || 0);

    setFeeStructure([
      ...feeStructure,
      {
        id: feeStructure.length + 1,
        ...newFeeStructure,
        tuitionFee: parseInt(newFeeStructure.tuitionFee),
        examFee: parseInt(newFeeStructure.examFee),
        libraryFee: parseInt(newFeeStructure.libraryFee),
        otherFees: parseInt(newFeeStructure.otherFees),
        total,
      },
    ]);

    setNewFeeStructure({
      course: "",
      semester: "",
      tuitionFee: "",
      examFee: "",
      libraryFee: "",
      otherFees: "",
    });
    setIsAddFeeDialogOpen(false);
    alert("Fee structure added successfully!");
  };

  const handleRecordPayment = () => {
    if (!paymentData.amount || !paymentData.paymentMethod) {
      alert("Please fill in all required fields");
      return;
    }

    const amount = parseInt(paymentData.amount);
    const updatedPayments = studentPayments.map((s) => {
      if (s.id === selectedStudent.id) {
        const newPaidAmount = s.paidAmount + amount;
        const newPendingAmount = s.totalFee - newPaidAmount;
        return {
          ...s,
          paidAmount: newPaidAmount,
          pendingAmount: newPendingAmount,
          status:
            newPendingAmount === 0
              ? "Paid"
              : newPaidAmount > 0
                ? "Partial"
                : "Pending",
          lastPaymentDate: new Date().toISOString().split("T")[0],
        };
      }
      return s;
    });

    setStudentPayments(updatedPayments);

    setPaymentHistory([
      {
        id: paymentHistory.length + 1,
        studentId: selectedStudent.studentId,
        studentName: selectedStudent.studentName,
        amount,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId || `TXN${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        status: "Success",
      },
      ...paymentHistory,
    ]);

    setPaymentData({
      amount: "",
      paymentMethod: "",
      transactionId: "",
      remarks: "",
    });
    setSelectedStudent(null);
    setIsPaymentDialogOpen(false);
    alert("Payment recorded successfully!");
  };

  const openPaymentDialog = (student) => {
    setSelectedStudent(student);
    setPaymentData({
      amount: "",
      paymentMethod: "",
      transactionId: "",
      remarks: "",
    });
    setIsPaymentDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-600">Paid</Badge>;
      case "Partial":
        return <Badge className="bg-yellow-600">Partial</Badge>;
      case "Pending":
        return <Badge className="bg-red-600">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {onSectionChange && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSectionChange("overview")}
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="flex items-center gap-2 text-blue-400">
          <DollarSign className="h-6 w-6" />
          Fee Management
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-600 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl text-slate-100 mb-1">
              ₹{stats.totalCollected.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Total Collected</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-600 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl text-slate-100 mb-1">
              ₹{stats.totalPending.toLocaleString()}
            </p>
            <p className="text-sm text-slate-400">Total Pending</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl text-slate-100 mb-1">
              {stats.paidStudents}
            </p>
            <p className="text-sm text-slate-400">Fully Paid Students</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-600 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl text-slate-100 mb-1">
              {stats.totalStudents}
            </p>
            <p className="text-sm text-slate-400">Total Students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <DollarSign className="h-6 w-6" />
            Fee Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 p-1 gap-1">
              <TabsTrigger
                value="overview"
                className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm whitespace-nowrap px-2"
              >
                <span className="hidden sm:inline">Student Payments</span>
                <span className="sm:hidden">Payments</span>
              </TabsTrigger>
              <TabsTrigger
                value="structure"
                className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm whitespace-nowrap px-2"
              >
                <span className="hidden sm:inline">Fee Structure</span>
                <span className="sm:hidden">Structure</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm whitespace-nowrap px-2"
              >
                <span className="hidden sm:inline">Payment History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
            </TabsList>

            {/* Student Payments Tab */}
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by student name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
                <Button
                  variant="outline"
                  className="hidden md:flex bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Student ID</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Semester</TableHead>
                      <TableHead className="text-slate-300">Total Fee</TableHead>
                      <TableHead className="text-slate-300">Paid</TableHead>
                      <TableHead className="text-slate-300">Pending</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow
                        key={payment.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                      >
                        <TableCell className="text-slate-200">
                          {payment.studentId}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.studentName}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.course}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.semester}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          ₹{payment.totalFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-green-400">
                          ₹{payment.paidAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-400">
                          ₹{payment.pendingAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          {payment.status !== "Paid" && (
                            <Button
                              size="sm"
                              onClick={() => openPaymentDialog(payment)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Record Payment
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-slate-300 text-sm mb-1">Student ID</div>
                        <div className="text-slate-100 font-medium">{payment.studentId}</div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="mb-3">
                      <div className="text-slate-300 text-sm mb-1">Name</div>
                      <div className="text-slate-100">{payment.studentName}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Course</div>
                        <div className="text-slate-100">{payment.course}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Semester</div>
                        <div className="text-slate-100">{payment.semester}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Total Fee</div>
                        <div className="text-slate-100">₹{payment.totalFee.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Paid</div>
                        <div className="text-green-400">₹{payment.paidAmount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Pending</div>
                        <div className="text-red-400">₹{payment.pendingAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    {payment.status !== "Paid" && (
                      <Button
                        size="sm"
                        onClick={() => openPaymentDialog(payment)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Record Payment
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Fee Structure Tab */}
            <TabsContent value="structure" className="space-y-4 mt-4">
              <div className="flex justify-end">
                <Dialog
                  open={isAddFeeDialogOpen}
                  onOpenChange={setIsAddFeeDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Fee Structure
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">
                        Add Fee Structure
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300">Course *</Label>
                          <Select
                            value={newFeeStructure.course}
                            onValueChange={(value) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                course: value,
                              })
                            }
                          >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="B.Tech">B.Tech</SelectItem>
                              <SelectItem value="M.Tech">M.Tech</SelectItem>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="MCA">MCA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-300">Semester *</Label>
                          <Select
                            value={newFeeStructure.semester}
                            onValueChange={(value) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                semester: value,
                              })
                            }
                          >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <SelectItem key={sem} value={sem.toString()}>
                                  Semester {sem}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-300">Tuition Fee *</Label>
                          <Input
                            type="number"
                            placeholder="45000"
                            value={newFeeStructure.tuitionFee}
                            onChange={(e) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                tuitionFee: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Exam Fee *</Label>
                          <Input
                            type="number"
                            placeholder="2000"
                            value={newFeeStructure.examFee}
                            onChange={(e) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                examFee: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Library Fee *</Label>
                          <Input
                            type="number"
                            placeholder="1000"
                            value={newFeeStructure.libraryFee}
                            onChange={(e) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                libraryFee: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Other Fees *</Label>
                          <Input
                            type="number"
                            placeholder="2000"
                            value={newFeeStructure.otherFees}
                            onChange={(e) =>
                              setNewFeeStructure({
                                ...newFeeStructure,
                                otherFees: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleAddFeeStructure}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Add Fee Structure
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Semester</TableHead>
                      <TableHead className="text-slate-300">Tuition Fee</TableHead>
                      <TableHead className="text-slate-300">Exam Fee</TableHead>
                      <TableHead className="text-slate-300">Library Fee</TableHead>
                      <TableHead className="text-slate-300">Other Fees</TableHead>
                      <TableHead className="text-slate-300">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStructure.map((fee) => (
                      <TableRow
                        key={fee.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                      >
                        <TableCell className="text-slate-200">{fee.course}</TableCell>
                        <TableCell className="text-slate-200">
                          Semester {fee.semester}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          ₹{fee.tuitionFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          ₹{fee.examFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          ₹{fee.libraryFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          ₹{fee.otherFees.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-100">
                          ₹{fee.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {feeStructure.map((fee) => (
                  <div
                    key={fee.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-slate-100 font-medium text-lg">{fee.course}</div>
                        <div className="text-slate-400 text-sm">Semester {fee.semester}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-300 text-sm">Total</div>
                        <div className="text-slate-100 font-medium">₹{fee.total.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Tuition Fee</div>
                        <div className="text-slate-100">₹{fee.tuitionFee.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Exam Fee</div>
                        <div className="text-slate-100">₹{fee.examFee.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Library Fee</div>
                        <div className="text-slate-100">₹{fee.libraryFee.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Other Fees</div>
                        <div className="text-slate-100">₹{fee.otherFees.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="history" className="space-y-4 mt-4">
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Transaction ID</TableHead>
                      <TableHead className="text-slate-300">Student ID</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Amount</TableHead>
                      <TableHead className="text-slate-300">Method</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow
                        key={payment.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                      >
                        <TableCell className="text-slate-200">
                          {payment.transactionId}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.studentId}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.studentName}
                        </TableCell>
                        <TableCell className="text-green-400">
                          ₹{payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.paymentMethod}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {payment.date}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-600">{payment.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-slate-300 text-sm mb-1">Transaction ID</div>
                        <div className="text-slate-100 font-medium">{payment.transactionId}</div>
                      </div>
                      <Badge className="bg-green-600">{payment.status}</Badge>
                    </div>
                    <div className="mb-2">
                      <div className="text-slate-300 text-sm mb-1">Student</div>
                      <div className="text-slate-100">{payment.studentName}</div>
                      <div className="text-slate-400 text-sm">{payment.studentId}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Amount</div>
                        <div className="text-green-400">₹{payment.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Date</div>
                        <div className="text-slate-100">{payment.date}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-slate-300 mb-1">Payment Method</div>
                      <div className="text-slate-100">{payment.paymentMethod}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Record Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-slate-100">Record Payment</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-700 rounded-lg">
                <p className="text-slate-300">
                  <strong>Student:</strong> {selectedStudent.studentName}
                </p>
                <p className="text-slate-300">
                  <strong>ID:</strong> {selectedStudent.studentId}
                </p>
                <p className="text-slate-300">
                  <strong>Pending Amount:</strong> ₹
                  {selectedStudent.pendingAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <Label className="text-slate-300">Payment Amount *</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={paymentData.amount}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, amount: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Payment Method *</Label>
                <Select
                  value={paymentData.paymentMethod}
                  onValueChange={(value) =>
                    setPaymentData({ ...paymentData, paymentMethod: value })
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Online">Online Payment</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Transaction ID</Label>
                <Input
                  placeholder="Optional"
                  value={paymentData.transactionId}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      transactionId: e.target.value,
                    })
                  }
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Remarks</Label>
                <Input
                  placeholder="Optional"
                  value={paymentData.remarks}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, remarks: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>

              <Button
                onClick={handleRecordPayment}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
