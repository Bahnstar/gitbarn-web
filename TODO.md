<!--toc:start-->

- [TO DO](#to-do)
- [For future investigation](#for-future-investigation)
<!--toc:end-->

# TO DO

- [ ] Connect the profile page to supabase
- [ ] Add a page to manage/send mass emails for admins
- [ ] User management page
- [X] Proper signup page
- [ ] Notifications should be created everywhere that an email is sent
- [ ] Delete products
- [ ] Cart/Notifications in sidebar should have an indicator if there are things inside
- [ ] Integrate pulling customer data from Tiger on sign-up
- [ ] Add "drops per month" analytic to the dashboard (Low priority)
- [ ] Think about removing all tables
- [x] Allow admins to upload documents for other users
- [x] Send a notification to admins on order submission
- [x] Allow support to open a new chat with a specific user
- [x] Order details page
- [x] Order page should implement proper filtering
- [x] Move products to use Tiger instead of supabase
- [x] Allow support users to claim a chat
- [x] Chats should show avatar URL and name
- [x] Chat list should show who's claimed it (To both client/user)
- [x] Support/Admins should be able to see order details for all orders
- [x] Only Admins can manage products

# Bugs

- [ ] Support Chat shows incorrect names
- [X] Support Chat Online indicator sometimes has 3 names (duplicates)
- [ ] Client gives error when no avatar url is set for a user
- [X] Login button on the home page on mobile needs to be visible
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
