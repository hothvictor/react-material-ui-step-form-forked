import React, { createContext, useCallback, useMemo, useReducer } from "react";
import { initialValues } from "./initialValues";
import _ from "lodash";
const isText = /^[A-Z ]+$/i;
const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const isPhone = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/; // us
const isZip = /^[0-9]{5}([- /]?[0-9]{4})?$/; // us
const isNumber = /^\d+$/;

// Applied to all fields

type Variant = "outlined" | "standard" | "filled";
type Margin = "dense" | "normal" | "none";

const variant: Variant = "standard";
const margin: Margin = "normal";

export declare type ValidationSchema = Record<
  string,
  {
    value?: any;
    error?: string;
    required?: boolean;
    validate?:
      | "text"
      | "number"
      | "email"
      | "phone"
      | "zip"
      | "checkbox"
      | "select";
    minLength?: number;
    maxLength?: number;
    helperText?: string;
  }
>;

type ContextProps = {
  steps: Array<String>;
  activeStep: number;
  formValues: ValidationSchema;
  // eslint-disable-next-line no-unused-vars
  handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ): void;
  handleNext(): void;
  handleBack(): void;
  openModal(): void;
  setActiveStep(step: number): void;
  setMenu(option: string): void;
  variant: Variant;
  margin: Margin;
  streamOptions: Array<DropdownOption>;
  bookingHosptialOptions: Array<DropdownOption>;
  bookingHosptialMappingOptions: Array<DropdownOption>;
  modal: boolean;
  updateBookingHospitalMappingOptions(hosptialCode: string): void;
  updateBookingHospitalOptions(hosptialCode: string): void;
  menu: string;
};

export const AppContext = createContext<ContextProps>({
  menu: "",
  steps: [],
  activeStep: 0,
  formValues: initialValues,
  handleChange() {},
  handleNext() {},
  handleBack() {},
  openModal() {},
  setActiveStep() {},
  setMenu() {},
  variant,
  margin,
  streamOptions: [],
  bookingHosptialOptions: [],
  bookingHosptialMappingOptions: [],
  modal: false,
  updateBookingHospitalMappingOptions() {},
  updateBookingHospitalOptions() {},
});

interface ProviderProps {
  children: React.ReactNode;
}

type DropdownOption = {
  value: string;
  label: string;
};

type State = {
  menu: string;
  steps: Array<String>;
  activeStep: number;
  formValues: ValidationSchema;
  streamOptions: Array<DropdownOption>;
  bookingHosptialOptions: Array<DropdownOption>;
  bookingHosptialMappingOptions: Array<DropdownOption>;
  modal: boolean;
};

type Action =
  | { type: "SET_ACTIVE_STEP"; payload: number }
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "form-value"; name: string; fieldValue: any }
  | { type: "form-error"; name: string; error: string }
  | { type: "OPEN_MODAL" }
  | { type: "SET_MENU"; option: string }
  | { type: "UPDATE_BOOKING_HOSPITAL_OPTIONS"; hospitalCode: string }
  | { type: "UPDATE_BOOKING_HOSPITAL_MAPPING"; hospitalCode: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, menu: action.option };
    case "SET_ACTIVE_STEP":
      return { ...state, activeStep: action.payload };
    case "increase":
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case "decrease":
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case "form-value":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            value: action.fieldValue,
          },
        },
      };
    case "form-error":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            error: action.error,
          },
        },
      };

    case "OPEN_MODAL":
      return {
        ...state,
        modal: !state.modal,
      };

    case "UPDATE_BOOKING_HOSPITAL_OPTIONS":
      const hosptialCode = action.hospitalCode;
      const newOptions = state.bookingHosptialOptions.filter(
        (obj) => obj.value !== hosptialCode
      );
      return {
        ...state,
        bookingHosptialOptions: newOptions,
      };

    case "UPDATE_BOOKING_HOSPITAL_MAPPING":
      const newObject = {
        value: action.hospitalCode,
        label: action.hospitalCode,
      };
      const sortedOptions = _.sortBy(
        [...state.bookingHosptialMappingOptions, newObject],
        "label"
      );
      return {
        ...state,
        bookingHosptialMappingOptions: sortedOptions,
      };

    default:
      return state;
  }
}

export function StepsProvider({ children }: ProviderProps) {
  const [
    {
      activeStep,
      formValues,
      menu,
      steps,
      streamOptions,
      modal,
      bookingHosptialOptions,
      bookingHosptialMappingOptions,
    },
    dispatch,
  ] = useReducer(reducer, {
    menu: "Stepper",
    steps: [
      "Stream",
      "Booking Hospital",
      "C/R Hospital",
      "Bed Type",
      "Ward",
      "Booking Module",
      "Cut-off Time",
      "Bed Availability",
    ],
    activeStep: 0,
    formValues: initialValues,
    streamOptions: [
      { value: "MED", label: "MED" },
      { value: "SUR", label: "SUR" },
    ],
    bookingHosptialOptions: [
      { value: "AHN", label: "AHN" },
      { value: "PWH", label: "PWH" },
      { value: "TMH", label: "TMH" },
    ],
    bookingHosptialMappingOptions: [
      { value: "QMH", label: "QMH" },
      { value: "VH", label: "VH" },
    ],
    modal: false,
  });

  // Proceed to next step
  const handleNext = useCallback(() => dispatch({ type: "increase" }), []);
  // Go back to prev step
  const handleBack = useCallback(() => dispatch({ type: "decrease" }), []);

  const openModal = useCallback(() => {
    console.log("openModal");
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  // Function to update the activeStep
  const setActiveStep = useCallback((step: number) => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: step });
  }, []);

  const setMenu = useCallback((option: string) => {
    dispatch({ type: "SET_MENU", option });
  }, []);

  // Handle form change
  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      checked?: boolean
    ) => {
      const { type, name, value } = event.target;

      const fieldValue = type === "checkbox" ? checked : value;

      dispatch({ type: "form-value", name, fieldValue });

      const fieldName = initialValues[name];
      if (!fieldName) return;

      const { required, validate, minLength, maxLength, helperText } =
        fieldName;

      let error = "";

      if (required && !fieldValue) error = "This field is required";
      if (minLength && value && value.length < minLength)
        error = `Minimum ${minLength} characters is required.`;
      if (maxLength && value && value.length > maxLength)
        error = "Maximum length exceeded!";
      if (validate) {
        switch (validate) {
          case "text":
            if (value && !isText.test(value))
              error = helperText || "This field accepts text only.";
            break;

          case "number":
            if (value && !isNumber.test(value))
              error = helperText || "This field accepts numbers only.";
            break;

          case "email":
            if (value && !isEmail.test(value))
              error = helperText || "Please enter a valid email address.";
            break;

          case "phone":
            if (value && !isPhone.test(value))
              error =
                helperText ||
                "Please enter a valid phone number. i.e: xxx-xxx-xxxx";
            break;

          case "zip":
            if (value && !isZip.test(value))
              error = helperText || "Please enter a valid zip code.";
            break;

          case "checkbox":
            if (!checked) error = helperText || "Please provide a valid value.";
            break;

          case "select":
            if (!value) error = helperText || "Please select a value.";
            break;

          default:
            break;
        }
      }

      dispatch({ type: "form-error", name, error });
    },
    []
  );

  const updateBookingHospitalOptions = useCallback((hospitalCode: string) => {
    dispatch({
      type: "UPDATE_BOOKING_HOSPITAL_OPTIONS",
      hospitalCode,
    });
  }, []);

  const updateBookingHospitalMappingOptions = useCallback(
    (hospitalCode: string) => {
      dispatch({
        type: "UPDATE_BOOKING_HOSPITAL_MAPPING",
        hospitalCode,
      });
    },
    []
  );

  const constextValue = useMemo(
    () => ({
      menu,
      steps,
      activeStep,
      formValues,
      handleChange,
      handleNext,
      handleBack,
      setActiveStep,
      setMenu,
      variant,
      margin,
      streamOptions,
      bookingHosptialOptions,
      bookingHosptialMappingOptions,
      modal,
      openModal,
      updateBookingHospitalMappingOptions,
      updateBookingHospitalOptions,
    }),
    [
      menu,
      steps,
      activeStep,
      formValues,
      handleChange,
      handleNext,
      handleBack,
      setActiveStep,
      setMenu,
      streamOptions,
      bookingHosptialOptions,
      bookingHosptialMappingOptions,
      modal,
      openModal,
      updateBookingHospitalMappingOptions,
      updateBookingHospitalOptions,
    ]
  );

  return (
    <AppContext.Provider value={constextValue}>
      <div className="mui-step-form">{children}</div>
    </AppContext.Provider>
  );
}
