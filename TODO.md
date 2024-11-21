<!--toc:start-->

- [TO DO](#to-do)
- [For future investigation](#for-future-investigation)
<!--toc:end-->

# TO DO

- [ ] Add a page to manage/send mass emails for admins
- [ ] Allow admins to upload documents for other users
- [x] Send a notification to admins on order submission
- [ ] Connect the profile page to supabase
- [ ] Integrate pulling customer data from Tiger on sign-up
- [ ] Allow support to open a new chat with a specific user
- [ ] Order details page
- [ ] Order page should implement proper filtering
- [ ] Move products to use Tiger instead of supabase
- [ ] Allow support users to claim a chat
- [ ] Cart/Notifications in sidebar should have an indicator if there are things inside
- [ ] Add "drops per month" analytic to the dashboard (Low priority)
- [ ] Chats should show avatar URL and name
- [ ] Chat list should show who's claimed it (To both client/user)
- [ ] Support/Admins should be able to see order details for all orders
- [ ] User management page

# Bugs

- [ ] Client gives error when no avatar url is set for a user
- [ ] Login button on the home page on mobile needs to be visible
- [ ] Mobile responsiveness (Maybe swap out tables?)

# Security Questions

- RBAC? https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac?queryGroups=language&language=plpgsql
- Could someone authenticated technically read any of the support chats from the client?

# Future Investigation

- Additional analytics
- Inventory management
- A map with latitude/longitude for orders on the dashboard
- Refactor the close conversation/document upload buttons to be a single unified component
- Remove the use of RLS as a filtering method from our API
- File previews for documents
- Chats should link to a viewable profile/history page for the customer
