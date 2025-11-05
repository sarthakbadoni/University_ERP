import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Megaphone, FileImage, Download } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

export default function PopupCircular({ userType }) {
  const [popupCirculars, setPopupCirculars] = useState([]);
  const [currentCircularIndex, setCurrentCircularIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get circulars from localStorage (simulating backend data)
    const storedCirculars = localStorage.getItem("circulars");
    if (storedCirculars) {
      const allCirculars = JSON.parse(storedCirculars);
      
      // Filter popup circulars for the current user type
      const relevantPopups = allCirculars.filter((circular) => {
        if (!circular.isPopup) return false;
        
        // Check if circular is relevant to this user type
        if (circular.target === "All") return true;
        if (userType === "student" && (circular.target === "All Students" || circular.target.includes("B.Tech") || circular.target.includes("M.Tech"))) {
          return true;
        }
        if (userType === "faculty" && circular.target === "All Faculty") {
          return true;
        }
        return false;
      });

      // Check which popups have already been seen
      const seenPopups = JSON.parse(localStorage.getItem(`seenPopups_${userType}`) || "[]");
      const unseenPopups = relevantPopups.filter(
        (circular) => !seenPopups.includes(circular.id)
      );

      if (unseenPopups.length > 0) {
        setPopupCirculars(unseenPopups);
        setIsOpen(true);
      }
    }
  }, [userType]);

  const handleClose = () => {
    if (popupCirculars.length > 0) {
      // Mark current circular as seen
      const seenPopups = JSON.parse(localStorage.getItem(`seenPopups_${userType}`) || "[]");
      const currentCircular = popupCirculars[currentCircularIndex];
      
      if (!seenPopups.includes(currentCircular.id)) {
        seenPopups.push(currentCircular.id);
        localStorage.setItem(`seenPopups_${userType}`, JSON.stringify(seenPopups));
      }

      // Move to next circular or close
      if (currentCircularIndex < popupCirculars.length - 1) {
        setCurrentCircularIndex(currentCircularIndex + 1);
      } else {
        setIsOpen(false);
      }
    }
  };

  if (!isOpen || popupCirculars.length === 0) {
    return null;
  }

  const circular = popupCirculars[currentCircularIndex];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
        <Card className="bg-slate-800 border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-slate-100">Important Notice</CardTitle>
                  <Badge
                    variant={
                      circular.priority === "High"
                        ? "destructive"
                        : circular.priority === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {circular.priority}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-slate-100 mb-3">{circular.title}</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{circular.content}</p>
            </div>

            {circular.attachmentUrl && circular.attachmentName && (
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileImage className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-slate-200">{circular.attachmentName}</p>
                      <p className="text-xs text-slate-400">Attached file</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      // Open file in new tab or download
                      if (circular.attachmentUrl) {
                        const link = document.createElement("a");
                        link.href = circular.attachmentUrl;
                        link.target = "_blank";
                        link.download = circular.attachmentName;
                        link.click();
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>

                {/* Show preview if it's an image */}
                {circular.attachmentName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                  <div className="mt-4">
                    <img
                      src={circular.attachmentUrl}
                      alt={circular.attachmentName}
                      className="w-full rounded-lg max-h-96 object-contain bg-slate-900"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {circular.target}
                </Badge>
                <span>📅 {circular.date}</span>
              </div>
              {popupCirculars.length > 1 && (
                <p className="text-xs text-slate-400">
                  {currentCircularIndex + 1} of {popupCirculars.length} notices
                </p>
              )}
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {currentCircularIndex < popupCirculars.length - 1
                ? "Next Notice"
                : "Got it, Close"}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
