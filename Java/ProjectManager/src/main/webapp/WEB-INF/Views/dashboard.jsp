<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<!-- c:out ; c:forEach ; c:if -->
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Formatting (like dates) -->
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome, <c:out value="${ user.firstName }"/>!</title>
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div class="container">
      <!-- Beginning of Container -->
    </div>
    <h1>Welcome, <c:out value="${ user.firstName }"/> <c:out value="${ user.lastName }"/>!</h1>
    <a class="btn btn-primary" href="/newProject">+ Add Project</a>
    <a class="btn btn-danger" href="/logout">Log Out</a>
    <h4>All Projects:</h4>
    <table class="table table-dark table-hover">
      <tr>
        <th>Title</th>
        <th>Project Lead</th>
        <th>Due Date</th>
        <th>Actions</th>
      </tr>
      <c:forEach var="i" items="${allProjects}">
        <c:choose>
          <c:when test="${user.id == i.user.id}">
            <tr  >
              <td><a style="color: white" href="/oneProject/${i.id}"><c:out value="${i.title}"/></a></td>
              <td><c:out value="${i.user.firstName}"></c:out> <c:out value="${i.user.lastName}"></c:out></td>	
              <td><fmt:formatDate type = "date"  dateStyle = "long" value = "${i.dueDate}" /></td>
              <td><a class="btn btn-primary" href="/editProject/${i.id}">Edit</a><a class="btn btn-danger" href="/deleteProject/${i.id}">Delete</a></td>
            </tr>
          </c:when>
          <c:otherwise>
            <tr >
              <td><a style="color: white" href="/oneProject/${i.id}"><c:out value="${i.title}"/></a></td>
              <td><c:out value="${i.user.firstName}"></c:out> <c:out value="${i.user.lastName}"></c:out></td>	
              <td><fmt:formatDate type = "date"  dateStyle = "long" value = "${i.dueDate}" /></td>
              <td><a class="btn btn-light" href="/oneProject/${i.id}">View This Project</a></td>
            </tr>
          </c:otherwise>
        </c:choose>
      </c:forEach>
    </table>
  </body>
</html>