import React, { useEffect, useState } from "react";
import { fetchForm, updateForm } from "../Redux/Slice";
import { useAppDispatch, useAppSelector } from "../Redux/UseAppType";
import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import ClipLoader from "react-spinners/ClipLoader";

export const DynamicForm = () => {
  const [formData, setFormData] = useState<any>({});
  const [updatedData, setUpdatedData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const formField = useAppSelector(
    (state: any) => state?.form?.initialFormData?.data?.data
  );

  const getUpdatedData = useAppSelector(
    (state: any) => state?.form?.updatedFormData?.data?.data
  );

  useEffect(() => {
    setUpdatedData(getUpdatedData);
    setLoading(false);
  }, [getUpdatedData]);

  useEffect(() => {
    dispatch(fetchForm());
  }, []);

  useEffect(() => {
    if (formField?.length) {
      formField?.map((item: any, i: number) => {
        formData[item.fieldName] = item.value;
      });
      setFormData({ ...formData });
    }
  }, [formField]);

  console.log("DAta", formField, formData);
  return (
    <>
      <div className="header"></div>
      <div className="container">
        <h1>Dynamic Form</h1>
        <Formik
          initialValues={formData}
          onSubmit={(values: any) => {
            setLoading(true);
            dispatch(updateForm(values));
            setUpdatedData(getUpdatedData ? getUpdatedData : null);
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              {formField &&
                formField?.map((item: any, i: number) => {
                  switch (item.type) {
                    case "text":
                      return (
                        <TextField
                          key={i}
                          color="secondary"
                          sx={{ m: 2 }}
                          fullWidth
                          id="outlined-basic"
                          label={item?.fieldName}
                          variant="outlined"
                          value={values[item.fieldName]}
                          type={item.type}
                          name={item.fieldName}
                          onChange={handleChange}
                        />
                      );
                    case "email":
                      return (
                        <TextField
                          sx={{ m: 2 }}
                          color="secondary"
                          fullWidth
                          id="outlined-basic"
                          label={item?.fieldName}
                          variant="outlined"
                          value={values[item.fieldName]}
                          type={item.type}
                          name={item.fieldName}
                          onChange={handleChange}
                        />
                      );
                    case "number":
                      return (
                        <TextField
                          sx={{ m: 2 }}
                          color="secondary"
                          fullWidth
                          id="outlined-basic"
                          label={item?.fieldName}
                          variant="outlined"
                          value={values[item.fieldName]}
                          type={item.type}
                          name={item.fieldName}
                          onChange={handleChange}
                        />
                      );
                    case "select":
                      return (
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-helper-label">
                            {item?.fieldName}
                          </InputLabel>
                          <NativeSelect
                            sx={{ m: 2 }}
                            color="secondary"
                            fullWidth
                            id="demo-simple-select"
                            variant="outlined"
                            value={values[item.fieldName]}
                            type={item.type}
                            name={item.fieldName}
                            onChange={handleChange}
                          >
                            {item?.options?.map((item: any, i: number) => {
                              return <option value={item}>{item}</option>;
                            })}
                          </NativeSelect>
                        </FormControl>
                      );
                    case "multiline":
                      return (
                        <TextField
                          sx={{ m: 2 }}
                          color="secondary"
                          fullWidth
                          id="outlined-basic"
                          label={item?.fieldName}
                          variant="outlined"
                          value={values[item.fieldName]}
                          type={item.type}
                          name={item.fieldName}
                          onChange={handleChange}
                        />
                      );

                    default:
                      break;
                  }
                })}

              <Typography align="center">
                <Button type="submit" variant="contained" color="secondary">
                  {loading ? (
                    <ClipLoader />
                  ) : (
                    <span className="button__text">Submit</span>
                  )}
                </Button>
              </Typography>
            </Form>
          )}
        </Formik>
        {getUpdatedData ? (
          <div>
            <h5>Response</h5>
            {JSON.stringify(getUpdatedData)}
          </div>
        ) : null}
      </div>
    </>
  );
};
