import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import FAQ from "./sections/FAQ";
import { VideoCaseStudy } from "./sections/VideoCaseStudy";
import { CaseStudies } from "./sections/caseStudies/CaseStudies";
import { PAT } from "./sections/caseStudies/PAT";




function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="/pat" element={<PAT />} />
                <Route path="/video" element={<VideoCaseStudy />} />
                <Route path="/caseStudies" element={<CaseStudies />} />
                <Route path="/faq" element={<FAQ />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
