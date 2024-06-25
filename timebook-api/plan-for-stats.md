# Stats for Timebook

## The idea

In our app, we would like to be able to see a project or a user timesheet, either by activities list, or by reports.
The activity list is already handled by the `Activity.readMany` controller, so we need a new handler for getting reports for a project or a user.

## The plan

We will be offering the following `/stats` routes:

* `/stats/project/:id` - for project stats
* `/stats/person/:id` - for person sats

## The reports structure

We will be offering different aggregations, depending on:

* requesting stats for a project or for a person.
* requesting stats a month or a year.

If we request stats for **a project**, we'll be returning the `collaborators` field.
If we request stats for **a user**, we'll be returning the `projects` field.

### Reports structure for a project

json```
  {
    "aggregated": {
      duration_total: Number,
      duration_validated: Number,
      duration_invoiced: Number
      count_collaborators: Number,
      earliest_date: String
      latest_date: String
    },
    "collaborators": [{
      name: String,
      duration_total: Number,
      duration_validated: Number,
      duration_invoiced: Number
    }],
    "projects": [{
      name: String,
      duration_total: Number,
      duration_validated: Number,
      duration_invoiced: Number
    }]
    "monthly": [{
      name: String (i.e. January)
      duration_total: Number,
      duration_validated: Number,
      duration_invoiced: Number
    }],
    "current_month": [{
      name: String (i.e. 1-31)
      duration_total: Number,
      duration_validated: Number,
      duration_invoiced: Number
    }]
  }
```json
