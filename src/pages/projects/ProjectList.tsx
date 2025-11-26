import { useEffect, useState } from "react";
import { mockGetProjects, mockCreateProject } from "../../services/mockApi";
import Button from "../../component/ui/Button";
import Card from "../../component/ui/Card";


export default function ProjectList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      setItems(await mockGetProjects());
    })();
  }, []);

  const addSample = async () => {
    const newP = await mockCreateProject({ name: "New Project " + Date.now(), description: "Created locally" });
    setItems([newP, ...items]);
  };

  return (
    <div>
      <h2>Projects (mock)</h2>
      <Button onClick={addSample} sx={{ mb: 2 }}>Add Demo Project</Button>
      {items.map((p) => (
        <Card key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </Card>
      ))}
    </div>
  );
}
