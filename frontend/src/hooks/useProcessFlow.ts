export const useProcessFlow = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Spec",
      desc: "Drag and drop your swagger.json or openapi.yaml file.",
      delay: 0.2,
    },
    {
      number: "02",
      title: "Generate Code",
      desc: "We automatically type major endpoints and create tool definitions.",
      delay: 0.4,
    },
    {
      number: "03",
      title: "Connect Agent",
      desc: "Run the server locally and connect it to Claude or custom agents.",
      delay: 0.6,
    },
  ];

  return { steps };
};
