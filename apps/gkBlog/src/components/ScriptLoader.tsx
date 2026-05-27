import { useEffect } from "react";

function ScriptLoader() {
  useEffect(() => {
    const { userAgent } = navigator;

    // Parse OS
    let os = "未知";
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

    // Parse Browser
    let browser = "未知";
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Edg")) browser = "Edge";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";

    const setElement = (id: string, value: string) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setElement("userAgentOs", os);
    setElement("userAgentBrowser", browser);

    // Fetch IP info from qingju API
    fetch("https://api.qjqq.cn/api/ipv4")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setElement("userAgentIp", data.ip || data.addr || "未知");
          setElement("userAgentCountry", data.country || "未知");
          setElement("userAgentRegion", data.province || data.region || "未知");
          setElement("userAgentCity", data.city || "未知");
          setElement("userAgentIsp", data.isp || "未知");
        }
      })
      .catch(() => {
        ["userAgentIp", "userAgentCountry", "userAgentRegion", "userAgentCity", "userAgentIsp"].forEach(
          (id) => setElement(id, "获取失败"),
        );
      });
  }, []);

  return null;
}

export default ScriptLoader;
