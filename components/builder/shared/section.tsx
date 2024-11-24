import {
  Button,
  Popover,
  Tooltip,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "#components";
import { createId } from "@paralleldrive/cuid2";
import { PhEnvelope } from "@phosphor-icons/vue";
import { X, Plus } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import type { CustomField as ICustomField } from "~/lib/schema";

type CustomFieldProps = {
  field: ICustomField;
  onChange: (field: ICustomField) => void;
  onRemove: (id: string) => void;
};

export const CustomField = ({
  field,
  onChange,
  onRemove,
}: CustomFieldProps) => {
  const handleChange = (key: "icon" | "name" | "value", value: string) => {
    onChange({ ...field, [key]: value });
  };

  return (
    <div class="flex items-end justify-between space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            {field.icon ? (
              <i class={cn(`ph ph-${field.icon}`)} />
            ) : (
              <PhEnvelope />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-1.5">
          <Input
            v-model={field.icon}
            place-holder={`Enter Phosphor Icon`}
            onUpdate:modelValue={(value) => {
              onChange({ ...field, icon: value as string });
            }}
          />
        </PopoverContent>
      </Popover>

      <Input
        place-holder={`Name`}
        v-model={field.name}
        class="!ml-0"
        onUpdate:modelValue={(value) => {
          handleChange("name", value as string);
        }}
      />

      <Input
        place-holder={`Value`}
        v-model={field.value}
        onUpdate:modelValue={(value) => {
          handleChange("value", value as string);
        }}
      />

      <Button
        size="icon"
        variant="link"
        class="!ml-0 shrink-0"
        onClick={() => {
          onRemove(field.id);
        }}
      >
        <X />
      </Button>
    </div>
  );
};

type Props = {
  className?: string;
};

export const CustomFieldsSection = ({ className }: Props) => {
  const resumeStore = useResumeStore();
  const customFields = resumeStore.$state.resume.data.basics.custom_fields;

  const onAddCustomField = () => {
    resumeStore.setValue("basics.custom_fields", [
      ...customFields,
      { id: createId(), icon: "", name: "", value: "" },
    ]);
  };

  const onChangeCustomField = (field: ICustomField) => {
    const index = customFields.findIndex((item) => item.id === field.id);
    const newCustomFields = JSON.parse(JSON.stringify(customFields));
    newCustomFields[index] = field;

    resumeStore.setValue("basics.custom_fields", newCustomFields);
  };

  const onReorderCustomFields = (values: ICustomField[]) => {
    resumeStore.setValue("basics.custom_fields", values);
  };

  const onRemoveCustomField = (id: string) => {
    resumeStore.setValue(
      "basics.custom_fields",
      customFields.filter((field) => field.id !== id)
    );
  };

  return (
    <div class={cn("space-y-4", className)}>
      {customFields.map((field) => (
        <CustomField
          key={field.id}
          field={field}
          onChange={onChangeCustomField}
          onRemove={onRemoveCustomField}
        />
      ))}

      <Button variant="default" onClick={onAddCustomField} >
        <Plus class="mr-2" />
        <span>{`Add a custom field`}</span>
      </Button>
    </div>
  );
};
