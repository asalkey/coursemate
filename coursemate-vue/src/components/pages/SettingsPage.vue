<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:3%">Coursemate </a>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="">Logout</a></li>
                </ul>

        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-6 tagline">
                    <h4 class="mb-3">Settings</h4>
                    <form class="needs-validation" novalidate="">
                        <div class="mb-3">
                          <label for="email">Email</label>
                          <input type="email" class="form-control" id="email" placeholder="you@example.com">
                          <div class="invalid-feedback">

                          </div>
                        </div>

                        <div class="mb-3">
                          <label for="address">Password</label>
                          <input type="password" class="form-control" id="address" placeholder="******" required="">
                          <div class="invalid-feedback">

                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="email">School</label>
                          <input type="email" class="form-control" id="email" placeholder="Harvard Extension School">
                          <div class="invalid-feedback">

                          </div>
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Update Settings</button>
                    </form>
                </div>
                <div class="col-6">
                  <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Your current courses</span>
                  </h4>
                  <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">Piano 101</h6>
                      </div>
                      <span class="text-muted">x</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">Intro to Jazz</h6>
                      </div>
                        <span class="text-muted">x</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">Advanced Guitar</h6>
                      </div>
                        <span class="text-muted">x</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Add a course</button>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsPage',
    data: function (){
        return{
        }
    }
}
</script>
