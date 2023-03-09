import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCmsData, updateCms } from "../../redux/action/cms/getCmsDataAction";
import MyEditor from "../../utils/myeditor/MyEditor";

const About = ({ cmsData }) => {
  const { t, i18n } = useTranslation();
  const [aboutContent, setAboutContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAbout = (e, editor) => {
    const data = editor?.getData();
    setAboutContent(data);
  };
  const onSubmit = () => {
    !cmsData.content
      ? dispatch(
          addCmsData(0, aboutContent, () => {
            navigate("/cms");
          })
        )
      : dispatch(
          updateCms(0, aboutContent, () => {
            navigate("/cms");
          })
        );
  };

  useEffect(() => {
    cmsData?.content && setAboutContent(cmsData?.content);
  }, [cmsData]);
  return (
    <>
      <MyEditor editorContent={aboutContent} onChange={handleAbout} />
      <div className="edit_btn_custom">
        <Button type="submit" variant="contained" onClick={onSubmit}>
          {cmsData.content ? `${t("action.edit")}` : `${t("action.add")}`}
        </Button>
      </div>
    </>
  );
};

export default About;
