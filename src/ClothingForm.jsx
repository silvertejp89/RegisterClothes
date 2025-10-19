import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseClient";

export default function ClothingForm() {
  const [formData, setFormData] = useState({
    type: "",
    color: "",
    material: "",
  });
  const [clothes, setClothes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      // 👇 Lägg till dokument i Firestore
      await addDoc(collection(db, "clothes"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      // Uppdatera UI lokalt
      setClothes([...clothes, formData]);
      setFormData({ type: "", color: "", material: "" });
      alert("✅ Item saved to Firestore!");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("❌ Could not save item.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register Clothing Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (e.g. sweater)"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="material"
          value={formData.material}
          onChange={handleChange}
          placeholder="Material"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={isSaving}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            isSaving && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isSaving ? "Saving..." : "Add Item"}
        </button>
      </form>

      <ul className="mt-6">
        {clothes.map((c, i) => (
          <li key={i} className="border-b py-2">
            <strong>{c.type}</strong> – {c.color}, {c.material}
          </li>
        ))}
      </ul>
    </div>
  );
}
