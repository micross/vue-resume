import { Page } from "#components";
import { getTemplate } from "~/components/template";
import { useResumeStore } from "~/stores/resume";
import { type Template } from "~/lib/utils";

definePageMeta({
  auth: true,
  layout: "artboard",
});

export default function Preview() {
  const template = useResumeStore().$state.resume.data.metadata
    .template as Template;

  const RTemplate = getTemplate(template);

  return (
    <Page mode="preview">
      <RTemplate />
    </Page>
  );
}
