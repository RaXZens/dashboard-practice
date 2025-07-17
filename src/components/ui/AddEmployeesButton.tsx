import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { fromTheme } from "tailwind-merge";

function AddEmployeesButton() {
  const [openform, SetOpenform] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
    salary: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/AddEmployees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setSuccess(data.success);
      setFormData({
        name: "",
        department: "",
        position: "",
        salary: 0,
      });
    }
  };
  const handleClose = () => {
    SetOpenform(false);
    window.location.reload();
  };


  return (
    <div>
      <button onClick={() => SetOpenform(true)} className="ms-5 p-2 border-2 ">
        Add New Employees{" "}
      </button>
      <div
        className="absolute top-1/4 right-1/4 border-2 rounded-xl bg-white p-4 shadow-lg "
        id="form-controls"
        style={{
          display: openform === true ? "block" : "none",
        }}
      >
        <h1 className="mb-4">Add Employees form</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 mb-4 ">
              <Label htmlFor="name">Name </Label>
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="department">Department </Label>
              <select
                id="department"
                className="border-1 rounded-md shadow-xs p-1.5"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="Null">Select Department</option>
                <option value="IT & Technology">IT & Technology</option>
                <option value="Sales">Sales</option>
                <option value="Production/Operations">Production/Operations</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="position">Position </Label>
              <select
                id="department"
                className="border-1 rounded-md shadow-xs p-1.5"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              >
                <option className="rounded-xl" value="Null">
                  Select Position
                </option>
                <option value="Software Developer">Software Developer</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Production Manager">Production Manager</option>
                <option value="Sales Manager">Sales Manager</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="salary">Salary </Label>
              <Input
                type="number"
                placeholder=""
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex gap-1">
              <Button className="rounded-lg">Add</Button>
              <Button
                onClick={handleClose}
                className="bg-gray-400 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddEmployeesButton;
