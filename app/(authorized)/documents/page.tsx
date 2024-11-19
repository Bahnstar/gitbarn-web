import { getDocuments } from "@/server/handlers/documents"
import DocumentTable from "./DocumentTable"
import DocumentUpload from "./DocumentUpload"
import { processDocument } from "@/utils/forms"

export default async function DocumentsPage() {
  const { data: documents, error } = await getDocuments()

  return (
    <div className="flex w-full flex-1 flex-col gap-8 p-6">
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-3xl font-semibold text-gray-900 ">Documents</h1>
        <DocumentUpload action={processDocument} />
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5">
        <DocumentTable documents={documents || []} />
      </div>
    </div>
  )
}
