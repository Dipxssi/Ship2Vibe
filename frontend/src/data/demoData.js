export const sidebarItems = [
  { id: "voice", label: "Voice Agent" },
  { id: "commands", label: "Commands" },
  { id: "code-preview", label: "Code Preview" },
  { id: "timeline", label: "Activity Timeline" },
];

export const initialActivities = [
  { id: 1, command: "Create login API", timestamp: "2m ago" },
  { id: 2, command: "Fix bug in auth.js", timestamp: "8m ago" },
  { id: 3, command: "Generate tests for user routes", timestamp: "22m ago" },
];

export const codeTabs = [
  {
    id: "file1.js",
    label: "file1.js",
    before: `function authenticate(user) {
  if (!user) return null;
  if (user.token) {
    return fetchUser(user.token);
  }
  return null;
}`,
    after: `async function authenticate(user) {
  if (!user?.token) {
    throw new Error("Missing auth token");
  }
  return fetchUser(user.token);
}`,
  },
  {
    id: "app.py",
    label: "app.py",
    before: `def create_login(data):
    if not data:
        return None
    return build_response(data)`,
    after: `def create_login(data):
    if not data:
        raise ValueError("missing payload")
    return build_response(data)`,
  },
];

export const aiResponses = [
  "Refactoring function with stronger guard clauses...",
  "Generating API route with validation middleware...",
  "Applying auth bug fix and adding test stubs...",
];
