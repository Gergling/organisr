import { Drive } from "../../shared/google-api/components/Drive";

export const Checklist = () => {
  return (
    <ul>
      <li>✅ Setup with React.</li>
      <li>✅ Setup Jest.</li>
      <li>❌ Add a README.</li>
      <li>❌ Nail down data-access, model, util, ui, feature type structure if necessary.</li>
      <li>✅ Contextualize preload API.</li>
      <li>✅ Contextualize an App wrapper to keep the App component thin.</li>
      <li>✅ Contextualize Google API.</li>
      <li>❌ Fix absolute typescript paths for electron.</li>
      <li>❌ Fix absolute typescript paths for linting.</li>
      <li>❌ Fix typescript import meta.</li>
      <li>✅ Authorize google drive.
        <Drive />
      </li>
      <li>✅ Fix type issues with preload stuff.</li>
      <li>❌ Connect to a Google sheet.</li>
      <li>❌ Display the contents of a Google sheet.</li>
      <li>❌ Add a row to a Google sheet.</li>
      <li>❌ Edit a row in a Google sheet.</li>
      <li>❌ Need to make a production version to test.<ul>
        <li>❌ Make a phone version.</li>
      </ul></li>
      <li>❌ Rename the folder</li>
      <li>❌ Setup a remote repo</li>
      <li>❌ Separate the api from the renderer files</li>
      <li>❌ Nice to have: Attempt to setup a local persistence e.g. mongo database or equivalent. Testing can be done with a simple counter.</li>
    </ul>
  );
}