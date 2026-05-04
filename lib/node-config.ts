export const NODE_CONFIG = {
  Email: {
    fields: [
      { key: "to", label: "To", type: "text" },
      { key: "subject", label: "Subject", type: "text" },
      { key: "body", label: "Body", type: "text" },
    ],
  },

  Condition: {
    fields: [
      { key: "value", label: "Value", type: "text" },
      {
        key: "condition",
        label: "Condition",
        type: "select",
        options: ["includes", "equals", "startsWith"],
      },
    ],
  },

  AI: {
    fields: [
      { key: "prompt", label: "Prompt", type: "textarea" },
    ],
  },

  Slack: {
    fields: [
      { key: "content", label: "Message", type: "text" },
    ],
  },

  Notion: {
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "body" , label:"Page Content" , type: "textarea"},
      // { key: "databaseId", label: "Database ID", type: "text" },
    ],
  },

  // GOOGLE DRIVE
  "Google Drive": {
    fields: [
      {
        key: "action",
        label: "Action",
        type: "select",
        options: ["uploadFile", "useFile", "passFile"],
      },

      {
        key: "fileName",
        label: "File Name",
        type: "text",
      },

      {
        key: "fileContent",
        label: "File Content / Text",
        type: "text",
      },

      {
        key: "fileId",
        label: "File ID (from previous node)",
        type: "text",
      },
    ],
  },

  //GOOGLE CALENDAR
  "Google Calendar": {
    fields: [
      {
        key: "summary",
        label: "Event Title",
        type: "text",
      },

      {
        key: "description",
        label: "Description",
        type: "text",
      },

      {
        key: "start",
        label: "Start DateTime (ISO)",
        type: "text",
      },

      {
        key: "end",
        label: "End DateTime (ISO)",
        type: "text",
      },

      {
        key: "location",
        label: "Location",
        type: "text",
      },
    ],
  },
};