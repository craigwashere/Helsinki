import React, { useState }from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, useField } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, HealthCheckRating, SelectField, DiagnosisTypeOption } from "./FormField";
import { Entry, EntryType } from "../types";
import { assertNever } from "../utils";
import HealthCheckEntry from "../PatientPage/HealthCheckEntry";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type DiagnosisFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: DiagnosisFormValues) => void;
  onCancel: () => void;
}

interface HealthCheckEntryFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HealthCheckExtra: React.FC<HealthCheckEntryFormProps> = ({ onChange })  => 
  <Field name="healthCheckRating" component={HealthCheckRating} onChange={onChange} value={2}/>

const OccupationalHealthCareExtra = () => {
  return (
    <div>
      <Field label="Employer"         placeholder = "Employer"      name="employerName"            component={TextField} />
      <Field label="Start Date"       placeholder = "YYYY-MM-DD"    name="sickLeave.startDate"     component={TextField} />
      <Field label="EndDate"          placeholder = "YYYY-MM-DD"    name="sickLeave.endDate"       component={TextField} />
    </div>
  )
}

const HospitalEntryExtra = () => {
  return (
    <div>
      <Field label="Discharge Date" placeholder = "YYYY-MM-DD"    name="discharge.dischargeDate" component={TextField} />
      <Field label="Criteria"       placeholder = "Criteria"      name="discharge.criteria"      component={TextField} />
    </div>
  )
}

interface ExtraFieldsProps {
  onChange:   (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExtraFields: React.FC<ExtraFieldsProps> = ({ onChange}) =>  {
  const [entryType] = useField("type")
   switch(entryType.value) {
    case EntryType.Hospital: return (<HospitalEntryExtra />);
    case EntryType.OccupationalHealthCare:  return (<OccupationalHealthCareExtra />);
    case EntryType.HealthCheck:  return(<HealthCheckExtra onChange={onChange} />); 
    default: assertNever(entryType);
  } 
  return null;
}
  
const diagnosisTypeOptions: DiagnosisTypeOption[] = [
  { value: EntryType.Hospital,               label: "Hospital"   },
  { value: EntryType.OccupationalHealthCare, label: "Occupational Health Care" },
  { value: EntryType.HealthCheck,            label: "Health Check"  }
];

export const AddDiagnosisForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [, setRating ] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setRating(parseInt(e.target.value))

  return (
    <Formik
       initialValues={{ description: "",  date: "", specialist: "", type: "HealthCheck" }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description)    errors.description    = requiredError;
        if (!values.date)           errors.date           = requiredError;
        if (!values.specialist)     errors.specialist     = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field label="Date"         placeholder = "YYYY-MM-DD"   name="date"         component={TextField} />
            <Field label="Description"  placeholder = "description"  name="description"  component={TextField} />
            <Field label="Specialist"   placeholder = "specialist"   name="specialist"   component={TextField} />

            <DiagnosisSelection setFieldValue={setFieldValue} 
                                setFieldTouched={setFieldTouched}
                                diagnoses={Object.values(diagnoses)}
            />

            <SelectField name="type" label="Visit Type" options={diagnosisTypeOptions} /> 
            
            <ExtraFields onChange={handleChange} />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">Cancel</Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>Add</Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiagnosisForm;
