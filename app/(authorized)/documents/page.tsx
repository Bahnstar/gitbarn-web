import { getDocuments } from "@/server/handlers/documents"
import DocumentTable from "./DocumentTable"
import DocumentUpload from "./DocumentUpload"
import { processDocument } from "@/utils/forms"
import { getUserWithProfile } from "@/server/handlers/users"

export default async function DocumentsPage() {
  const { data, error } = await getUserWithProfile()
  const { data: documents, error: derror } = await getDocuments()

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10 ">
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-4xl font-semibold leading-6 text-gray-900">Documents</h1>
        <DocumentUpload action={processDocument} />
      </div>

      <div>
        <DocumentTable initialDocuments={documents || []} role={data!.role} />
      </div>
    </div>
  )
}
