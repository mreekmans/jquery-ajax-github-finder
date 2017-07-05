// Client ID:      afd24306b898824320f5
// Client Secret:  f0bff7d2dd43f4c6335444af63a3eca2f90a4654


$(document).ready(function(){

    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;
        // console.log(username);
        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: 'afd24306b898824320f5',
                client_secret: 'f0bff7d2dd43f4c6335444af63a3eca2f90a4654'
            }
        }).done(function(user){
            console.log(user);
            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id: 'afd24306b898824320f5',
                    client_secret: 'f0bff7d2dd43f4c6335444af63a3eca2f90a4654',
                    sort: 'created: asc',
                    per_page: 5
                },
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    // console.log(repo.name);
                    $('#repos').append(`
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-10">
                                        <h3 class="panel-title">${repo.name}</h3>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo page</a>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-9">
                                        ${repo.description}
                                    </div>
                                    <div class="col-md-3 text-right">
                                        <span class="label label-default">Forks: ${repo.forks_count}</span>
                                        <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                        <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                })
            })
            $('#profile').html(`
                <div class="panel panel-primary">
                    <div class="panel-heading">
                       <h3 class="panel-title">${user.name} <small>(${user.login})</small></h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="avatar" src="${user.avatar_url}">
                            </div>
                            <div class="col-md-7">
                                <ul class="list-group user-info">
                                    <li class="list-group-item"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>  ${user.company}</li>
                                    <li class="list-group-item"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>  ${user.blog}</li>
                                    <li class="list-group-item"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>  ${user.location}</li>
                                    <li class="list-group-item"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>  ${user.created_at}</li>
                                </ul>
                            </div>
                            <div class="col-md-2 text-right">
                                <span class="label label-default">Public Repos: ${user.public_repos}</span><br>
                                <span class="label label-primary">Public Gists: ${user.public_gists}</span><br>
                                <span class="label label-success">Followers: ${user.followers}</span><br>
                                <span class="label label-info">Following: ${user.following}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Latest Repos</h2>
                <div id="repos"></div>
            `);
        })
    })

})
