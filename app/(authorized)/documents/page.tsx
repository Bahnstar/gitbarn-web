import { getDocuments } from "@/server/handlers/documents"
import DocumentTable from "./DocumentTable"
import DocumentUpload from "./DocumentUpload"
import { processDocument } from "@/utils/forms"
import { getUserWithProfile } from "@/server/handlers/users"

export default async function DocumentsPage() {
  const { data, error } = await getUserWithProfile()
  const { data: documents, error: derror } = await getDocuments()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">Documents</h1>
        <div className="mt-4 sm:mt-0">
          <DocumentUpload action={processDocument} />
        </div>
      </div>

      <div>
        <DocumentTable initialDocuments={documents || []} role={data!.role} />
      </div>
    </div>
  )
}
