<!--toc:start-->

- [TO DO](#to-do)
- [For future investigation](#for-future-investigation)
<!--toc:end-->

# TO DO

- [X] Connect the profile page to supabase
- [X] Add a page to manage/send mass emails for admins
- [X] User management page
- [X] Proper signup page
- [X] Notifications should be created everywhere that an email is sent
- [X] Delete products
- [X] Cart/Notifications in sidebar should have an indicator if there are things inside
- [ ] Integrate pulling customer data from Tiger on sign-up
- [ ] Add "drops per month" analytic to the dashboard (Low priority)
- [X] Think about removing all tables
- [X] Allow admins to upload documents for other users
- [X] Send a notification to admins on order submission
- [X] Allow support to open a new chat with a specific user
- [X] Order details page
- [X] Order page should implement proper filtering
- [X] Move products to use Tiger instead of supabase
- [X] Allow support users to claim a chat
- [X] Chats should show avatar URL and name
- [X] Chat list should show who's claimed it (To both client/user)
- [X] Support/Admins should be able to see order details for all orders
- [X] Only Admins can manage products

# Bugs

- [X] Support Chat shows incorrect names
- [X] Support Chat Online indicator sometimes has 3 names (duplicates)
- [X] Client gives error when no avatar url is set for a user
- [X] Login button on the home page on mobile needs to be visible
- [X] Mobile responsiveness (Maybe swap out tables?)

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
