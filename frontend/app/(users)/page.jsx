import { Button } from "antd";

export default function HomePage() {
  return (
    <div>
      Hello trungluc <span className="text-green-400 font-bold">OK nha</span>
      <Button type="primary">Click</Button>
    </div>
  );
}

HomePage.hideHeader = true;
